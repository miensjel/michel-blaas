import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(`cms:${password}`));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(req: NextRequest) {
  const pw = process.env.CMS_PASSWORD;
  if (!pw) {
    return NextResponse.redirect(new URL("/cms", req.url));
  }
  const token = req.cookies.get("cms_session")?.value ?? "";
  const expected = await hashPassword(pw);
  if (token !== expected) {
    return NextResponse.redirect(new URL("/cms", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path+"],
};
