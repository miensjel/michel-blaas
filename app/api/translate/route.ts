import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 503 });
  }

  const { text, from, to } = (await req.json()) as {
    text: string;
    from: "nl" | "en";
    to: "nl" | "en";
  };

  if (!text?.trim()) return Response.json({ translation: "" });

  const fromLabel = from === "nl" ? "Dutch" : "English";
  const toLabel = to === "nl" ? "Dutch" : "English";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Translate the following text from ${fromLabel} to ${toLabel}. Return ONLY the translation, no explanations, no quotes:\n\n${text}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }

  const data = (await res.json()) as {
    content?: Array<{ type: string; text: string }>;
  };
  const translation = data.content?.find((b) => b.type === "text")?.text ?? "";
  return Response.json({ translation });
}
