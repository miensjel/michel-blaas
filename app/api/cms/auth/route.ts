import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hashPassword, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/cms-auth";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password: string };
  const expected = process.env.CMS_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Ongeldig wachtwoord" }, { status: 401 });
  }

  const token = await hashPassword(password);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
