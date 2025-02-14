import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export const runtime = "nodejs"; // ✅ Ensure it's using Node.js runtime

export async function POST() {
  try {
    const tweet = "Hello from Next.js API route! 🚀";

    const rwClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    });

    await rwClient.v2.tweet(tweet);

    console.log("✅ Tweet posted successfully!");
    return NextResponse.json({ success: true, data: tweet });
  } catch (error: any) {
    console.error("❌ Error posting tweet:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
