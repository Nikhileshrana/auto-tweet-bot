import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

export async function POST() {
  try {
    // Instantiate the Twitter client using OAuth 1.0a credentials for read–write access
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    // Create a unique tweet to avoid duplicate errors
    const tweetText = `Hello, this is a test tweet at ${new Date().toISOString()}`;

    // Post the tweet using the v2 API endpoint
    const tweetResponse = await twitterClient.v2.tweet(tweetText);

    return NextResponse.json({
      message: 'Tweet posted successfully!',
      tweetResponse,
    });
  } catch (error: any) {
    // Log detailed error info
    console.error('Error posting tweet:', error);
    if (error.data) {
      console.error('Detailed error data:', error.data);
    }
    return NextResponse.json(
      { error: error.message || 'Failed to post tweet' },
      { status: 500 }
    );
  }
}
