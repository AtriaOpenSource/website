import { ImageKit } from "@imagekit/nodejs";
import { NextResponse } from "next/server";

const imagekitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY;

const imagekit = imagekitPrivateKey
    ? new ImageKit({ privateKey: imagekitPrivateKey })
    : null;

export async function GET() {
    if (!imagekit) {
        return NextResponse.json(
            { error: "Missing ImageKit private key configuration." },
            { status: 500 },
        );
    }

    const authParams = imagekit.helper.getAuthenticationParameters();
    return NextResponse.json(authParams, {
        headers: { "Cache-Control": "no-store, max-age=0" },
    });
}
