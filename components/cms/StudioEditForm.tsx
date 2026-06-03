"use client";

import { useState } from "react";
import type { StudioData } from "@/lib/cms-store";

type BodyRow = { nl: string; en: string };

const field: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-rule)",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  color: "var(--color-text)",
  resize: "vertical",
  lineHeight: 1.5,
  boxSizing: "border-box",
};

const label: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 4,
  display: "block",
};

export default function StudioEditForm({
  data,
  action,
}: {
  data: StudioData;
  action: (fd: FormData) => Promise<void>;
}) {
  const [body, setBody] = useState<BodyRow[]>(data.body);

  function addRow() {
    setBody((b) => [...b, { nl: "", en: "" }]);
  }

  function removeRow(i: number) {
    setBody((b) => b.filter((_, j) => j !== i));
  }

  function updateRow(i: number, field: "nl" | "en", val: string) {
    setBody((b) => b.map((r, j) => (j === i ? { ...r, [field]: val } : r)));
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <input type="hidden" name="body_json" value={JSON.stringify(body)} />

      {/* Lede */}
      <section>
        <p style={{ ...label, fontSize: 10, marginBottom: 14, color: "var(--color-text)" }}>
          Lede
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <span style={label}>NL</span>
            <textarea
              name="lede_nl"
              defaultValue={data.lede.nl}
              rows={3}
              style={field}
            />
          </div>
          <div>
            <span style={label}>EN</span>
            <textarea
              name="lede_en"
              defaultValue={data.lede.en}
              rows={3}
              style={field}
            />
          </div>
        </div>
      </section>

      {/* Body paragraphs */}
      <section>
        <p style={{ ...label, fontSize: 10, marginBottom: 14, color: "var(--color-text)" }}>
          Tekst — paragrafen
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {body.map((row, i) => (
            <div
              key={i}
              style={{
                padding: "14px",
                border: "1px solid var(--color-rule)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...label, marginBottom: 0 }}>Paragraaf {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Verwijder
                </button>
              </div>
              <div>
                <span style={label}>NL</span>
                <textarea
                  value={row.nl}
                  onChange={(e) => updateRow(i, "nl", e.target.value)}
                  rows={3}
                  style={field}
                />
              </div>
              <div>
                <span style={label}>EN</span>
                <textarea
                  value={row.en}
                  onChange={(e) => updateRow(i, "en", e.target.value)}
                  rows={3}
                  style={field}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          style={{
            marginTop: 10,
            background: "none",
            border: "1px dashed var(--color-rule)",
            padding: "8px 14px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            width: "100%",
          }}
        >
          + Paragraaf
        </button>
      </section>

      <button
        type="submit"
        style={{
          padding: "11px 24px",
          background: "var(--color-text)",
          color: "var(--color-bg)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Opslaan
      </button>
    </form>
  );
}
