"use client";

import { useState } from "react";
import Link from "next/link";
import type { WorkItem } from "@/lib/cms-store";
import BilingualField from "./BilingualField";

const MODEL_OPTIONS = [
  "chair", "lamp", "vase", "speaker", "stool", "kettle", "monolith", "bust",
] as const;

const SIZE_OPTIONS = ["sm", "md", "lg"] as const;

type Props = {
  work: WorkItem | null;
  action: (fd: FormData) => Promise<void>;
};

type SpecRow = { nl: string; en: string };

const input: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid var(--color-text)",
  background: "transparent",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "var(--color-text)",
  outline: "none",
  boxSizing: "border-box",
};

const lbl: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 5,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      {children}
    </div>
  );
}

export default function WorkEditForm({ work, action }: Props) {
  const [specs, setSpecs] = useState<SpecRow[]>(
    work?.specs.length ? work.specs : [{ nl: "", en: "" }]
  );

  const [category, setCategory] = useState(work?.category ?? { nl: "", en: "" });
  const [subtitle, setSubtitle] = useState(work?.subtitle ?? { nl: "", en: "" });
  const [status, setStatus] = useState(work?.status ?? { nl: "", en: "" });
  const [body, setBody] = useState(work?.body ?? { nl: "", en: "" });

  const biField: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid var(--color-text)",
    background: "transparent",
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "var(--color-text)",
    outline: "none",
    boxSizing: "border-box",
    lineHeight: 1.5,
    resize: "vertical" as const,
  };

  return (
    <form action={action} style={{ maxWidth: 800 }}>
      <input type="hidden" name="specs_json" value={JSON.stringify(specs)} />
      {/* Hidden controlled values for bilingual fields */}
      <input type="hidden" name="category_nl" value={category.nl} />
      <input type="hidden" name="category_en" value={category.en} />
      <input type="hidden" name="subtitle_nl" value={subtitle.nl} />
      <input type="hidden" name="subtitle_en" value={subtitle.en} />
      <input type="hidden" name="status_nl" value={status.nl} />
      <input type="hidden" name="status_en" value={status.en} />
      <input type="hidden" name="body_nl" value={body.nl} />
      <input type="hidden" name="body_en" value={body.en} />

      <div style={{ display: "grid", gap: 20 }}>
        {/* Row 1: id / model / size / year */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 120px", gap: 12 }}>
          <Field label="ID (url-slug)">
            <input
              name="id"
              defaultValue={work?.id ?? ""}
              readOnly={!!work}
              style={{ ...input, opacity: work ? 0.5 : 1, cursor: work ? "not-allowed" : "text" }}
            />
          </Field>
          <Field label="3D-model">
            <select name="model" defaultValue={work?.model ?? "chair"} style={input}>
              {MODEL_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Formaat">
            <select name="size" defaultValue={work?.size ?? "md"} style={input}>
              {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Jaar">
            <input name="year" defaultValue={work?.year ?? ""} style={input} />
          </Field>
        </div>

        {/* Title */}
        <Field label="Titel">
          <input name="title" defaultValue={work?.title ?? ""} style={input} />
        </Field>

        {/* Category */}
        <BilingualField
          label="Categorie"
          nameNl="_cat_nl"
          nameEn="_cat_en"
          valueNl={category.nl}
          valueEn={category.en}
          onChangeNl={(v) => setCategory((c) => ({ ...c, nl: v }))}
          onChangeEn={(v) => setCategory((c) => ({ ...c, en: v }))}
          type="input"
        />

        {/* Subtitle */}
        <BilingualField
          label="Subtitel"
          nameNl="_sub_nl"
          nameEn="_sub_en"
          valueNl={subtitle.nl}
          valueEn={subtitle.en}
          onChangeNl={(v) => setSubtitle((s) => ({ ...s, nl: v }))}
          onChangeEn={(v) => setSubtitle((s) => ({ ...s, en: v }))}
          type="input"
        />

        {/* Status */}
        <BilingualField
          label="Status"
          nameNl="_sta_nl"
          nameEn="_sta_en"
          valueNl={status.nl}
          valueEn={status.en}
          onChangeNl={(v) => setStatus((s) => ({ ...s, nl: v }))}
          onChangeEn={(v) => setStatus((s) => ({ ...s, en: v }))}
          type="input"
        />

        {/* Body */}
        <BilingualField
          label="Beschrijving"
          nameNl="_body_nl"
          nameEn="_body_en"
          valueNl={body.nl}
          valueEn={body.en}
          onChangeNl={(v) => setBody((b) => ({ ...b, nl: v }))}
          onChangeEn={(v) => setBody((b) => ({ ...b, en: v }))}
          rows={5}
        />

        {/* Specs */}
        <div>
          <p style={lbl}>Specs</p>
          <div style={{ display: "grid", gap: 6 }}>
            {specs.map((spec, i) => (
              <div
                key={i}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}
              >
                <input
                  placeholder="NL"
                  value={spec.nl}
                  onChange={(e) =>
                    setSpecs((prev) => prev.map((s, j) => j === i ? { ...s, nl: e.target.value } : s))
                  }
                  style={input}
                />
                <input
                  placeholder="EN"
                  value={spec.en}
                  onChange={(e) =>
                    setSpecs((prev) => prev.map((s, j) => j === i ? { ...s, en: e.target.value } : s))
                  }
                  style={input}
                />
                <button
                  type="button"
                  onClick={() => setSpecs((prev) => prev.filter((_, j) => j !== i))}
                  style={{
                    width: 36, height: 36, border: "1px solid var(--color-text)", background: "transparent",
                    cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-text)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSpecs((prev) => [...prev, { nl: "", en: "" }])}
              style={{
                padding: "8px 16px", border: "1px solid var(--color-text)", background: "transparent",
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", color: "var(--color-text)", width: "fit-content", marginTop: 2,
              }}
            >
              + Spec toevoegen
            </button>
          </div>
        </div>

        {/* Camera (advanced, collapsed) */}
        <details>
          <summary style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", cursor: "pointer", userSelect: "none" }}>
            Camera-instellingen ▸
          </summary>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
            <Field label="Afstand (dist)">
              <input name="dist" type="number" step="0.1" defaultValue={work?.dist ?? 5} style={input} />
            </Field>
            <Field label="Hoogte (height)">
              <input name="height" type="number" step="0.1" defaultValue={work?.height ?? 1} style={input} />
            </Field>
            <Field label="Snelheid (speed)">
              <input name="speed" type="number" step="0.1" defaultValue={work?.speed ?? 0.6} style={input} />
            </Field>
            <Field label="Achtergrond (hex)">
              <input name="bg" placeholder="e2dccf" defaultValue={work?.bg ? work.bg.toString(16) : ""} style={input} />
            </Field>
          </div>
        </details>

        <div style={{ borderTop: "1px solid var(--color-text)", marginTop: 4 }} />

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="submit"
            style={{
              padding: "11px 28px", background: "var(--color-text)", color: "var(--color-bg)",
              border: "none", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            Opslaan →
          </button>
          <Link
            href="/cms/dashboard"
            style={{
              padding: "11px 22px", border: "1px solid var(--color-text)", fontFamily: "var(--font-mono)",
              fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text)",
              textDecoration: "none", display: "inline-block",
            }}
          >
            Annuleren
          </Link>
        </div>
      </div>
    </form>
  );
}
