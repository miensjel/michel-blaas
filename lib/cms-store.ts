import "server-only";
import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import type { ModelName } from "@/lib/scene";

// KV is only available in production when Vercel env vars are set.
// Locally we fall back to JSON files on disk.
const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

export type WorkItem = {
  id: string;
  model: ModelName;
  dist: number;
  height: number;
  speed: number;
  bg?: number;
  size: "sm" | "md" | "lg";
  category: { nl: string; en: string };
  year: string;
  title: string;
  subtitle: { nl: string; en: string };
  status: { nl: string; en: string };
  body: { nl: string; en: string };
  specs: Array<{ nl: string; en: string }>;
};

export type StudioData = {
  lede: { nl: string; en: string };
  body: Array<{ nl: string; en: string }>;
};

export type ContactData = {
  email: string;
  reply: { nl: string; en: string };
  channels: Array<{
    abbr: string;
    label: { nl: string; en: string };
    href: string;
    arrow: string;
  }>;
};

export type ProcessData = {
  steps: Array<{
    num: string;
    body: { nl: string; en: string };
  }>;
};

// ── File-based fallback (local dev) ──────────────────────────────────────────

function readJsonSync<T>(file: string): T | null {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {}
  return null;
}

function writeJsonSync(file: string, data: unknown): void {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

const DATA_DIR = path.join(process.cwd(), "data");
const WORKS_FILE  = path.join(DATA_DIR, "works.json");
const STUDIO_FILE = path.join(DATA_DIR, "studio.json");
const CONTACT_FILE = path.join(DATA_DIR, "contact.json");
const PROCESS_FILE = path.join(DATA_DIR, "process.json");

// ── Helpers ───────────────────────────────────────────────────────────────────

async function kvGet<T>(key: string): Promise<T | null> {
  try {
    return await kv.get<T>(key);
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  await kv.set(key, value);
}

// ── Works ─────────────────────────────────────────────────────────────────────

export async function getWorks(): Promise<WorkItem[]> {
  if (KV_AVAILABLE) {
    const data = await kvGet<WorkItem[]>("cms:works");
    if (data) return data;
  }
  return readJsonSync<WorkItem[]>(WORKS_FILE) ?? [];
}

export async function saveWorks(items: WorkItem[]): Promise<void> {
  if (KV_AVAILABLE) {
    await kvSet("cms:works", items);
  } else {
    writeJsonSync(WORKS_FILE, items);
  }
}

export async function getWork(id: string): Promise<WorkItem | undefined> {
  return (await getWorks()).find((w) => w.id === id);
}

// ── Studio ────────────────────────────────────────────────────────────────────

const STUDIO_DEFAULT: StudioData = {
  lede: {
    nl: "Ik ben Michel Blaas, 24 jaar, productontwerper uit Delft.",
    en: "I'm Michel Blaas, 24, a product designer based in Delft.",
  },
  body: [],
};

export async function getStudio(): Promise<StudioData> {
  if (KV_AVAILABLE) {
    const data = await kvGet<StudioData>("cms:studio");
    if (data) return data;
  }
  return readJsonSync<StudioData>(STUDIO_FILE) ?? STUDIO_DEFAULT;
}

export async function saveStudio(data: StudioData): Promise<void> {
  if (KV_AVAILABLE) {
    await kvSet("cms:studio", data);
  } else {
    writeJsonSync(STUDIO_FILE, data);
  }
}

// ── Contact ───────────────────────────────────────────────────────────────────

const CONTACT_DEFAULT: ContactData = {
  email: "michelblaas@caiway.net",
  reply: { nl: "Antwoord binnen 48 uur.", en: "Reply within 48 hours." },
  channels: [],
};

export async function getContact(): Promise<ContactData> {
  if (KV_AVAILABLE) {
    const data = await kvGet<ContactData>("cms:contact");
    if (data) return data;
  }
  return readJsonSync<ContactData>(CONTACT_FILE) ?? CONTACT_DEFAULT;
}

export async function saveContact(data: ContactData): Promise<void> {
  if (KV_AVAILABLE) {
    await kvSet("cms:contact", data);
  } else {
    writeJsonSync(CONTACT_FILE, data);
  }
}

// ── Process ───────────────────────────────────────────────────────────────────

export async function getProcess(): Promise<ProcessData> {
  if (KV_AVAILABLE) {
    const data = await kvGet<ProcessData>("cms:process");
    if (data) return data;
  }
  return readJsonSync<ProcessData>(PROCESS_FILE) ?? { steps: [] };
}

export async function saveProcess(data: ProcessData): Promise<void> {
  if (KV_AVAILABLE) {
    await kvSet("cms:process", data);
  } else {
    writeJsonSync(PROCESS_FILE, data);
  }
}
