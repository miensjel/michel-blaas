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

const DATA_FILE = path.join(process.cwd(), "data", "works.json");

export function getWorks(): WorkItem[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as WorkItem[];
    }
  } catch {}
  // Inline fallback — avoids circular module issues
  return [];
}

export function saveWorks(items: WorkItem[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export function getWork(id: string): WorkItem | undefined {
  return getWorks().find((w) => w.id === id);
}
