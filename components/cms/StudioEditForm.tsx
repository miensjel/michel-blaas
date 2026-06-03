"use client";

import { useState, useActionState } from "react";
import type { StudioData } from "@/lib/cms-store";
import BilingualField from "./BilingualField";
import SubmitButton from "./SubmitButton";

type BodyRow = { nl: string; en: string };

const sectionLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-text)",
  marginBottom: 14,
};

export default function StudioEditForm({
  data,
  action,
}: {
  data: StudioData;
  action: (_prev: unknown, fd: FormData) => Promise<{ ok: boolean }>;
}) {
  const [lede, setLede] = useState(data.lede);
  const [body, setBody] = useState<BodyRow[]>(data.body);

  const [state, formAction] = useActionState(action, null);

  function addRow() {
    setBody((b) => [...b, { nl: "", en: "" }]);
  }
  function removeRow(i: number) {
    setBody((b) => b.filter((_, j) => j !== i));
  }
  function updateRow(i: number, lang: "nl" | "en", val: string) {
    setBody((b) => b.map((r, j) => (j === i ? { ...r, [lang]: val } : r)));
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <input type="hidden" name="body_json" value={JSON.stringify(body)} />

      <BilingualField
        label="Lede"
        nameNl="lede_nl"
        nameEn="lede_en"
        valueNl={lede.nl}
        valueEn={lede.en}
        onChangeNl={(v) => setLede((l) => ({ ...l, nl: v }))}
        onChangeEn={(v) => setLede((l) => ({ ...l, en: v }))}
        rows={4}
      />

      <section>
        <p style={sectionLabel}>Tekst — paragrafen</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {body.map((row, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                border: "1px solid var(--color-rule)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Paragraaf {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Verwijder
                </button>
              </div>
              <BilingualField
                nameNl={`body_${i}_nl`}
                nameEn={`body_${i}_en`}
                valueNl={row.nl}
                valueEn={row.en}
                onChangeNl={(v) => updateRow(i, "nl", v)}
                onChangeEn={(v) => updateRow(i, "en", v)}
              />
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

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SubmitButton />
        {state?.ok && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            ✓ Opgeslagen
          </span>
        )}
      </div>
    </form>
  );
}
