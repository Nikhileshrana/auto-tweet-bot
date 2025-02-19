import { NextResponse } from "next/server";
import axios from "axios";

const LINKEDIN_ME_URL = "https://api.linkedin.com/v2/userinfo";
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_POST_URL = "https://api.linkedin.com/v2/ugcPosts";

export async function GET() {
    try {

        // Fetch user's LinkedIn profile using the LinkedIn API and the access token
        const response = await axios.get(LINKEDIN_ME_URL, {
            method: "GET",
            headers: { Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}` },
        });

        console.log("LinkedIn profile response:", response.data);

        const text = "Hello from Next.js!";
        
        // Post a status update to LinkedIn using the LinkedIn API and the access token
        const response2 = await axios.post(
            LINKEDIN_POST_URL,
            {
                author: `urn:li:person:${response.data.sub}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: { text },
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

        return NextResponse.json(response2.data);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
