import { NextResponse } from "next/server";

const ADMIN_PASSWORD = "rsmuf72101512";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: "authenticated" });
    }
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
