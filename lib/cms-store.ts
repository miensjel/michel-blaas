import "server-only";
import fs from "fs";
import path from "path";
import { sql } from "@vercel/postgres";
import type { ModelName } from "@/lib/scene";

// In production POSTGRES_URL is set by the Vercel Neon integration.
// Locally we fall back to JSON files on disk so dev works without a DB.
const DB_AVAILABLE = !!process.env.POSTGRES_URL;

// Lazily create the table on the first request after a cold start.
// Uses CREATE TABLE IF NOT EXISTS so it's safe to call repeatedly.
let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS cms_data (
      key        TEXT        PRIMARY KEY,
      value      JSONB       NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  tableReady = true;
}

async function dbGet<T>(key: string): Promise<T | null> {
  await ensureTable();
  const { rows } = await sql`SELECT value FROM cms_data WHERE key = ${key}`;
  return (rows[0]?.value as T) ?? null;
}

async function dbSet(key: string, value: unknown): Promise<void> {
  await ensureTable();
  await sql`
    INSERT INTO cms_data (key, value, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `;
}

// ── File-based fallback (local dev without POSTGRES_URL) ─────────────────────

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

const DATA_DIR    = path.join(process.cwd(), "data");
const WORKS_FILE  = path.join(DATA_DIR, "works.json");
const STUDIO_FILE = path.join(DATA_DIR, "studio.json");
const CONTACT_FILE = path.join(DATA_DIR, "contact.json");
const PROCESS_FILE = path.join(DATA_DIR, "process.json");

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Works ─────────────────────────────────────────────────────────────────────

export async function getWorks(): Promise<WorkItem[]> {
  if (DB_AVAILABLE) {
    const data = await dbGet<WorkItem[]>("cms:works");
    if (data) return data;
  }
  return readJsonSync<WorkItem[]>(WORKS_FILE) ?? [];
}

export async function saveWorks(items: WorkItem[]): Promise<void> {
  if (DB_AVAILABLE) {
    await dbSet("cms:works", items);
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
  if (DB_AVAILABLE) {
    const data = await dbGet<StudioData>("cms:studio");
    if (data) return data;
  }
  return readJsonSync<StudioData>(STUDIO_FILE) ?? STUDIO_DEFAULT;
}

export async function saveStudio(data: StudioData): Promise<void> {
  if (DB_AVAILABLE) {
    await dbSet("cms:studio", data);
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
  if (DB_AVAILABLE) {
    const data = await dbGet<ContactData>("cms:contact");
    if (data) return data;
  }
  return readJsonSync<ContactData>(CONTACT_FILE) ?? CONTACT_DEFAULT;
}

export async function saveContact(data: ContactData): Promise<void> {
  if (DB_AVAILABLE) {
    await dbSet("cms:contact", data);
  } else {
    writeJsonSync(CONTACT_FILE, data);
  }
}

// ── Process ───────────────────────────────────────────────────────────────────

export async function getProcess(): Promise<ProcessData> {
  if (DB_AVAILABLE) {
    const data = await dbGet<ProcessData>("cms:process");
    if (data) return data;
  }
  return readJsonSync<ProcessData>(PROCESS_FILE) ?? { steps: [] };
}

export async function saveProcess(data: ProcessData): Promise<void> {
  if (DB_AVAILABLE) {
    await dbSet("cms:process", data);
  } else {
    writeJsonSync(PROCESS_FILE, data);
  }
}
