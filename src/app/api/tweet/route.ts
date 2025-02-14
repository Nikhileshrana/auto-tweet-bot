import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function POST() {
  try {
    const tweet = "Hello from Next.js API route! 🚀";
    const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY!,
        appSecret: process.env.TWITTER_API_SECRET!,
        accessToken: process.env.TWITTER_ACCESS_TOKEN!,
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
      });
  
      // Directly use the client (OAuth 1.0a already provides access)
      await client.v2.tweet(tweet);

    console.log("✅ Tweet posted successfully!");
    return NextResponse.json({ success: true, data: tweet });
  } catch (error: any) {
    console.error("❌ Error fetching tour packages:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
