import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function GET(req: Request) {


    const authHeader = req.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    
  try {
    const tweet = `Introducing Indian Travel Tour your destination :) ! 🚀
    https://indiantraveltour.com/
    `;
    
    const rwClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    await rwClient.v2.tweet(tweet);

    console.log("✅ Cron job tweet posted successfully!");
    return NextResponse.json({ success: true, data: tweet });
  } catch (error: any) {
    console.error("❌ Error posting tweet:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
