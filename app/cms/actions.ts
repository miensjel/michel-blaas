"use server";

import { getWorks, saveWorks, type WorkItem } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseForm(fd: FormData): Omit<WorkItem, "id"> {
  const specsJson = fd.get("specs_json") as string;
  const specs = specsJson ? (JSON.parse(specsJson) as WorkItem["specs"]) : [];

  const bgHex = (fd.get("bg") as string)?.trim();
  const bgNum = bgHex ? parseInt(bgHex, 16) : undefined;

  return {
    model: (fd.get("model") as WorkItem["model"]) || "chair",
    dist: Number(fd.get("dist") ?? 5),
    height: Number(fd.get("height") ?? 1),
    speed: Number(fd.get("speed") ?? 0.6),
    ...(bgNum !== undefined && !isNaN(bgNum) ? { bg: bgNum } : {}),
    size: (fd.get("size") as WorkItem["size"]) || "md",
    category: {
      nl: (fd.get("category_nl") as string) ?? "",
      en: (fd.get("category_en") as string) ?? "",
    },
    year: (fd.get("year") as string) ?? "",
    title: (fd.get("title") as string) ?? "",
    subtitle: {
      nl: (fd.get("subtitle_nl") as string) ?? "",
      en: (fd.get("subtitle_en") as string) ?? "",
    },
    status: {
      nl: (fd.get("status_nl") as string) ?? "",
      en: (fd.get("status_en") as string) ?? "",
    },
    body: {
      nl: (fd.get("body_nl") as string) ?? "",
      en: (fd.get("body_en") as string) ?? "",
    },
    specs,
  };
}

export async function createWork(fd: FormData) {
  const id = ((fd.get("id") as string) ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
  if (!id) return;
  const item: WorkItem = { id, ...parseForm(fd) };
  const works = getWorks();
  saveWorks([...works, item]);
  revalidatePath("/");
  revalidatePath("/cms/dashboard");
  redirect("/cms/dashboard");
}

export async function updateWork(id: string, fd: FormData) {
  const works = getWorks();
  const updated = works.map((w) =>
    w.id === id ? { id, ...parseForm(fd) } : w
  );
  saveWorks(updated);
  revalidatePath("/");
  revalidatePath("/cms/dashboard");
  redirect("/cms/dashboard");
}

export async function deleteWork(id: string) {
  const works = getWorks();
  saveWorks(works.filter((w) => w.id !== id));
  revalidatePath("/");
  revalidatePath("/cms/dashboard");
}

export async function reorderWorks(ids: string[]) {
  const works = getWorks();
  const map = new Map(works.map((w) => [w.id, w]));
  const reordered = ids.map((id) => map.get(id)).filter(Boolean) as WorkItem[];
  saveWorks(reordered);
  revalidatePath("/");
  revalidatePath("/cms/dashboard");
}
