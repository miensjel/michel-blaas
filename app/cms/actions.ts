"use server";

import {
  getWorks,
  saveWorks,
  saveStudio,
  saveContact,
  saveProcess,
  type WorkItem,
  type StudioData,
  type ContactData,
  type ProcessData,
} from "@/lib/cms-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/about");
}

// ── Works ────────────────────────────────────────────────────────────────────

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
  const works = await getWorks();
  await saveWorks([...works, item]);
  revalidateSite();
  revalidatePath("/cms/dashboard");
  redirect("/cms/dashboard");
}

export async function updateWork(id: string, fd: FormData) {
  const works = await getWorks();
  const updated = works.map((w) => (w.id === id ? { id, ...parseForm(fd) } : w));
  await saveWorks(updated);
  revalidateSite();
  revalidatePath("/cms/dashboard");
  redirect("/cms/dashboard");
}

export async function deleteWork(id: string) {
  const works = await getWorks();
  await saveWorks(works.filter((w) => w.id !== id));
  revalidateSite();
  revalidatePath("/cms/dashboard");
}

export async function reorderWorks(ids: string[]) {
  const works = await getWorks();
  const map = new Map(works.map((w) => [w.id, w]));
  const reordered = ids.map((id) => map.get(id)).filter(Boolean) as WorkItem[];
  await saveWorks(reordered);
  revalidateSite();
  revalidatePath("/cms/dashboard");
}

// ── Studio ───────────────────────────────────────────────────────────────────

export async function updateStudio(
  _prev: unknown,
  fd: FormData
): Promise<{ ok: boolean }> {
  const bodyJson = fd.get("body_json") as string;
  const body = bodyJson ? (JSON.parse(bodyJson) as StudioData["body"]) : [];
  const data: StudioData = {
    lede: {
      nl: (fd.get("lede_nl") as string) ?? "",
      en: (fd.get("lede_en") as string) ?? "",
    },
    body,
  };
  await saveStudio(data);
  revalidateSite();
  revalidatePath("/cms/studio");
  return { ok: true };
}

// ── Contact ──────────────────────────────────────────────────────────────────

export async function updateContact(
  _prev: unknown,
  fd: FormData
): Promise<{ ok: boolean }> {
  const channelsJson = fd.get("channels_json") as string;
  const channels = channelsJson
    ? (JSON.parse(channelsJson) as ContactData["channels"])
    : [];
  const data: ContactData = {
    email: (fd.get("email") as string) ?? "",
    reply: {
      nl: (fd.get("reply_nl") as string) ?? "",
      en: (fd.get("reply_en") as string) ?? "",
    },
    channels,
  };
  await saveContact(data);
  revalidateSite();
  revalidatePath("/cms/contact");
  return { ok: true };
}

// ── Process ──────────────────────────────────────────────────────────────────

export async function updateProcess(
  _prev: unknown,
  fd: FormData
): Promise<{ ok: boolean }> {
  const stepsJson = fd.get("steps_json") as string;
  const steps = stepsJson ? (JSON.parse(stepsJson) as ProcessData["steps"]) : [];
  const data: ProcessData = { steps };
  await saveProcess(data);
  revalidateSite();
  revalidatePath("/cms/process");
  return { ok: true };
}
