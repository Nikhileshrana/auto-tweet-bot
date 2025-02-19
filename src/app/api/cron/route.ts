import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// Gemini API constants
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

// X.com API constants
const TWITTER_API_KEY = process.env.TWITTER_API_KEY!;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET!;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN!;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET!;

// LinkedIn API constants
const LINKEDIN_ME_URL = "https://api.linkedin.com/v2/userinfo";
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_POST_URL = "https://api.linkedin.com/v2/ugcPosts";

// Initialize Gemini Flash
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function GET() {
  try {
    // Step 1: Fetch tour packages from /api/read
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/read`);
    const { data: tours } = await res.json();

    if (!tours || tours.length === 0) {
      throw new Error("No tour packages found.");
    }

    // Step 2: Select a random tour package
    const selectedTour = tours[Math.floor(Math.random() * tours.length)];
    console.log("🎉 Selected tour package:", selectedTour);

    const { heading1, location, slug } = selectedTour;
    const tourLink = `https://www.indiantraveltour.com/tour/${slug}`;

    // Step 3: Generate tweet using Gemini Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Create an engaging tweet about this tour package:\nTitle: ${heading1}\nPlaces covered: ${location}\nKeep it short, engaging, and add a CTA. \n Provide this link -> ${tourLink} inside the tweet also add some hashtags. and maintain the overall tweet count to be less than 340 characters.`;
    const result = await model.generateContent(prompt);
    const tweetContent = result.response.text();

    if (!tweetContent) {
      throw new Error("Gemini failed to generate tweet content.");
    }


    console.log("✅ Tweet generated successfully:", tweetContent);
    // Step 4: Post the tweet using Twitter API
    const rwClient = new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    });

    await rwClient.v2.tweet(tweetContent);
    console.log("✅ Tweet posted successfully!");



    // Step 5: Post the tweet using LinkedIn API
    const response = await axios.get(LINKEDIN_ME_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}` },
    });

    console.log("LinkedIn profile response:", response.data);

    // Post a status update to LinkedIn using the LinkedIn API and the access token
    const response2 = await axios.post(
      LINKEDIN_POST_URL,
      {
          author: `urn:li:person:${response.data.sub}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
              "com.linkedin.ugc.ShareContent": {
                  shareCommentary: { tweetContent },
                  shareMediaCategory: "NONE",
              },
          },
          visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      },
      {
          headers: {
              Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
              "X-Restli-Protocol-Version": "2.0.0",
              "Content-Type": "application/json",
          },
      }
  );

  console.log("LinkedIn post response:", response2.data);




    return NextResponse.json({ success: true, tweet: tweetContent });
  } catch (error: any) {
    console.error("❌ Error posting tweet:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
