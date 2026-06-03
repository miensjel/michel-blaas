"use client";

import { useState } from "react";
import Link from "next/link";
import type { WorkItem } from "@/lib/cms-store";

const MODEL_OPTIONS = [
  "chair",
  "lamp",
  "vase",
  "speaker",
  "stool",
  "kettle",
  "monolith",
  "bust",
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

const label: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 5,
};

function Field({
  lbl,
  children,
}: {
  lbl: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={label}>{lbl}</label>
      {children}
    </div>
  );
}

export default function WorkEditForm({ work, action }: Props) {
  const [specs, setSpecs] = useState<SpecRow[]>(
    work?.specs.length ? work.specs : [{ nl: "", en: "" }]
  );

  return (
    <form action={action} style={{ maxWidth: 800 }}>
      {/* Specs serialised for the server action */}
      <input type="hidden" name="specs_json" value={JSON.stringify(specs)} />

      <div style={{ display: "grid", gap: 20 }}>
        {/* Row 1: id / model / size / year */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 120px", gap: 12 }}
        >
          <Field lbl="ID (url-slug)">
            <input
              name="id"
              defaultValue={work?.id ?? ""}
              readOnly={!!work}
              style={{
                ...input,
                opacity: work ? 0.5 : 1,
                cursor: work ? "not-allowed" : "text",
              }}
            />
          </Field>
          <Field lbl="3D-model">
            <select name="model" defaultValue={work?.model ?? "chair"} style={input}>
              {MODEL_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field lbl="Formaat">
            <select name="size" defaultValue={work?.size ?? "md"} style={input}>
              {SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field lbl="Jaar">
            <input name="year" defaultValue={work?.year ?? ""} style={input} />
          </Field>
        </div>

        {/* Title */}
        <Field lbl="Titel">
          <input name="title" defaultValue={work?.title ?? ""} style={input} />
        </Field>

        {/* Category */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field lbl="Categorie (NL)">
            <input
              name="category_nl"
              defaultValue={work?.category.nl ?? ""}
              style={input}
            />
          </Field>
          <Field lbl="Category (EN)">
            <input
              name="category_en"
              defaultValue={work?.category.en ?? ""}
              style={input}
            />
          </Field>
        </div>

        {/* Subtitle */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field lbl="Subtitel (NL)">
            <input
              name="subtitle_nl"
              defaultValue={work?.subtitle.nl ?? ""}
              style={input}
            />
          </Field>
          <Field lbl="Subtitle (EN)">
            <input
              name="subtitle_en"
              defaultValue={work?.subtitle.en ?? ""}
              style={input}
            />
          </Field>
        </div>

        {/* Status */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field lbl="Status (NL)">
            <input
              name="status_nl"
              defaultValue={work?.status.nl ?? ""}
              style={input}
            />
          </Field>
          <Field lbl="Status (EN)">
            <input
              name="status_en"
              defaultValue={work?.status.en ?? ""}
              style={input}
            />
          </Field>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field lbl="Beschrijving (NL)">
            <textarea
              name="body_nl"
              defaultValue={work?.body.nl ?? ""}
              rows={5}
              style={{ ...input, resize: "vertical" }}
            />
          </Field>
          <Field lbl="Description (EN)">
            <textarea
              name="body_en"
              defaultValue={work?.body.en ?? ""}
              rows={5}
              style={{ ...input, resize: "vertical" }}
            />
          </Field>
        </div>

        {/* Specs */}
        <div>
          <p style={label}>Specs</p>
          <div style={{ display: "grid", gap: 6 }}>
            {specs.map((spec, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr auto",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="NL"
                  value={spec.nl}
                  onChange={(e) =>
                    setSpecs((prev) =>
                      prev.map((s, j) =>
                        j === i ? { ...s, nl: e.target.value } : s
                      )
                    )
                  }
                  style={input}
                />
                <input
                  placeholder="EN"
                  value={spec.en}
                  onChange={(e) =>
                    setSpecs((prev) =>
                      prev.map((s, j) =>
                        j === i ? { ...s, en: e.target.value } : s
                      )
                    )
                  }
                  style={input}
                />
                <button
                  type="button"
                  onClick={() =>
                    setSpecs((prev) => prev.filter((_, j) => j !== i))
                  }
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid var(--color-text)",
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--color-text)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
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
                padding: "8px 16px",
                border: "1px solid var(--color-text)",
                background: "transparent",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: "var(--color-text)",
                width: "fit-content",
                marginTop: 2,
              }}
            >
              + Spec toevoegen
            </button>
          </div>
        </div>

        {/* Camera (advanced, collapsed) */}
        <details>
          <summary
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Camera-instellingen ▸
          </summary>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 12,
              marginTop: 12,
            }}
          >
            <Field lbl="Afstand (dist)">
              <input
                name="dist"
                type="number"
                step="0.1"
                defaultValue={work?.dist ?? 5}
                style={input}
              />
            </Field>
            <Field lbl="Hoogte (height)">
              <input
                name="height"
                type="number"
                step="0.1"
                defaultValue={work?.height ?? 1}
                style={input}
              />
            </Field>
            <Field lbl="Snelheid (speed)">
              <input
                name="speed"
                type="number"
                step="0.1"
                defaultValue={work?.speed ?? 0.6}
                style={input}
              />
            </Field>
            <Field lbl="Achtergrond (hex)">
              <input
                name="bg"
                placeholder="e2dccf"
                defaultValue={work?.bg ? work.bg.toString(16) : ""}
                style={input}
              />
            </Field>
          </div>
        </details>

        {/* Divider */}
        <div
          style={{ borderTop: "1px solid var(--color-text)", marginTop: 4 }}
        />

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="submit"
            style={{
              padding: "11px 28px",
              background: "var(--color-text)",
              color: "var(--color-bg)",
              border: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Opslaan →
          </button>
          <Link
            href="/cms/dashboard"
            style={{
              padding: "11px 22px",
              border: "1px solid var(--color-text)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Annuleren
          </Link>
        </div>
      </div>
    </form>
  );
}
