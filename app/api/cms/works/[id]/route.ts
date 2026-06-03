import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getWorks, saveWorks } from "@/lib/cms-store";
import { hashPassword, SESSION_COOKIE } from "@/lib/cms-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const pw = process.env.CMS_PASSWORD;
  if (!pw) return Response.json({ error: "no config" }, { status: 401 });

  const session = req.cookies.get(SESSION_COOKIE)?.value ?? "";
  if (session !== (await hashPassword(pw))) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const updates = (await req.json()) as Record<string, unknown>;

  const works = await getWorks();
  const idx = works.findIndex((w) => w.id === id);
  if (idx === -1) return Response.json({ error: "not found" }, { status: 404 });

  // Deep merge — allows partial updates (e.g. just body or just title)
  works[idx] = deepMerge(works[idx] as Record<string, unknown>, updates) as typeof works[0];
  await saveWorks(works);
  revalidatePath("/");

  return Response.json({ ok: true });
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (
      sv !== null &&
      typeof sv === "object" &&
      !Array.isArray(sv) &&
      typeof tv === "object" &&
      tv !== null &&
      !Array.isArray(tv)
    ) {
      result[key] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else {
      result[key] = sv;
    }
  }
  return result;
}
