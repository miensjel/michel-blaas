"use client";

import { useState } from "react";
import type { ProcessData } from "@/lib/cms-store";
import { home } from "@/content/home";

type StepBody = { num: string; body: { nl: string; en: string } };

const fieldStyle: React.CSSProperties = {
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

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 4,
  display: "block",
};

export default function ProcessEditForm({
  data,
  action,
}: {
  data: ProcessData;
  action: (fd: FormData) => Promise<void>;
}) {
  const initialSteps: StepBody[] = home.process.steps.map((s) => {
    const stored = data.steps.find((d) => d.num === s.num);
    return { num: s.num, body: stored ? stored.body : s.body };
  });

  const [steps, setSteps] = useState<StepBody[]>(initialSteps);

  function updateBody(i: number, lang: "nl" | "en", val: string) {
    setSteps((prev) =>
      prev.map((s, j) =>
        j === i ? { ...s, body: { ...s.body, [lang]: val } } : s
      )
    );
  }

  const stepTitles = home.process.steps.map((s) => {
    const title = typeof s.title === "string" ? s.title : s.title;
    return title;
  });

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <input type="hidden" name="steps_json" value={JSON.stringify(steps)} />

      {steps.map((step, i) => (
        <section
          key={step.num}
          style={{
            padding: "16px",
            border: "1px solid var(--color-rule)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <p style={{ ...labelStyle, fontSize: 10, marginBottom: 6, color: "var(--color-text)" }}>
            Stap {step.num} — {typeof stepTitles[i] === "string" ? String(stepTitles[i]) : ""}
          </p>
          <div>
            <span style={labelStyle}>NL</span>
            <textarea
              value={step.body.nl}
              onChange={(e) => updateBody(i, "nl", e.target.value)}
              rows={3}
              style={fieldStyle}
            />
          </div>
          <div>
            <span style={labelStyle}>EN</span>
            <textarea
              value={step.body.en}
              onChange={(e) => updateBody(i, "en", e.target.value)}
              rows={3}
              style={fieldStyle}
            />
          </div>
        </section>
      ))}

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
