import { NextResponse } from "next/server";
import axios from "axios";

const LINKEDIN_ME_URL = "https://api.linkedin.com/v2/userinfo";
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN!;
const LINKEDIN_POST_URL = "https://api.linkedin.com/v2/ugcPosts";

export async function POST(req: Request) {
  try {
    const { tweetContent } = await req.json();
    if (!tweetContent) throw new Error("Missing LinkedIn post content.");

    // Get LinkedIn user ID
    const response = await axios.get(LINKEDIN_ME_URL, {
      headers: { Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}` },
    });

    console.log("LinkedIn profile response:", response.data);

    // Post to LinkedIn
    const response2 = await axios.post(
      LINKEDIN_POST_URL,
      {
        author: `urn:li:person:${response.data.sub}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: tweetContent },
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

    console.log("✅ LinkedIn post successful:", response2.data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error posting on LinkedIn:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
