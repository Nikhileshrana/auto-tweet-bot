import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// Gemini API Key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function GET() {
  try {
    // Fetch tour packages from /api/read
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/read`);
    const { data: tours } = await res.json();

    if (!tours || tours.length === 0) {
      throw new Error("No tour packages found.");
    }

    // Select a random tour package
    const selectedTour = tours[Math.floor(Math.random() * tours.length)];
    console.log("🎉 Selected tour package:", selectedTour);

    const { heading1, location, slug } = selectedTour;
    const tourLink = `https://www.indiantraveltour.com/tour/${slug}`;

    // Generate tweet content using Gemini Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Create an engaging tweet about this tour package:\nTitle: ${heading1}\nPlaces covered: ${location}\nKeep it short, engaging, and add a CTA. \n Provide this link -> ${tourLink} inside the tweet also add some hashtags. and maintain the overall tweet count to be less than 340 characters.`;
    
    const result = await model.generateContent(prompt);
    const tweetContent = result.response.text();

    if (!tweetContent) {
      throw new Error("Gemini failed to generate tweet content.");
    }

    console.log("✅ Tweet generated successfully:", tweetContent);

    // Call /api/tweet to post on Twitter
    await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bots/x`, { tweetContent });

    // Call /api/linkedinPost to post on LinkedIn
    await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bots/linkedin`, { tweetContent });

    return NextResponse.json({ success: true, tweet: tweetContent });
  } catch (error: any) {
    console.error("❌ Error in cron job:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
