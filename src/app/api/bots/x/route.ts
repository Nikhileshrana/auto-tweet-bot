import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

const TWITTER_API_KEY = process.env.TWITTER_API_KEY!;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET!;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN!;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET!;

export async function POST(req: Request) {
  try {
    const { tweetContent } = await req.json();
    if (!tweetContent) throw new Error("Missing tweet content.");

    // Initialize Twitter client
    const rwClient = new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    });

    await rwClient.v2.tweet(tweetContent);
    console.log("✅ Tweet posted successfully!");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error posting tweet:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
