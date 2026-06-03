import "server-only";
import fs from "fs";
import path from "path";
import type { ModelName } from "@/lib/scene";

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

function readJson<T>(file: string): T | null {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {}
  return null;
}

function writeJson(file: string, data: unknown): void {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

const DATA_DIR = path.join(process.cwd(), "data");

// ── Works ────────────────────────────────────────────────────────────────────

const WORKS_FILE = path.join(DATA_DIR, "works.json");

export function getWorks(): WorkItem[] {
  return readJson<WorkItem[]>(WORKS_FILE) ?? [];
}

export function saveWorks(items: WorkItem[]): void {
  writeJson(WORKS_FILE, items);
}

export function getWork(id: string): WorkItem | undefined {
  return getWorks().find((w) => w.id === id);
}

// ── Studio ───────────────────────────────────────────────────────────────────

const STUDIO_FILE = path.join(DATA_DIR, "studio.json");

const STUDIO_DEFAULT: StudioData = {
  lede: {
    nl: "Ik ben Michel Blaas, 24 jaar, productontwerper uit Delft.",
    en: "I'm Michel Blaas, 24, a product designer based in Delft.",
  },
  body: [],
};

export function getStudio(): StudioData {
  return readJson<StudioData>(STUDIO_FILE) ?? STUDIO_DEFAULT;
}

export function saveStudio(data: StudioData): void {
  writeJson(STUDIO_FILE, data);
}

// ── Contact ──────────────────────────────────────────────────────────────────

const CONTACT_FILE = path.join(DATA_DIR, "contact.json");

const CONTACT_DEFAULT: ContactData = {
  email: "michelblaas@caiway.net",
  reply: { nl: "Antwoord binnen 48 uur.", en: "Reply within 48 hours." },
  channels: [],
};

export function getContact(): ContactData {
  return readJson<ContactData>(CONTACT_FILE) ?? CONTACT_DEFAULT;
}

export function saveContact(data: ContactData): void {
  writeJson(CONTACT_FILE, data);
}

// ── Process ──────────────────────────────────────────────────────────────────

const PROCESS_FILE = path.join(DATA_DIR, "process.json");

export function getProcess(): ProcessData {
  return readJson<ProcessData>(PROCESS_FILE) ?? { steps: [] };
}

export function saveProcess(data: ProcessData): void {
  writeJson(PROCESS_FILE, data);
}
