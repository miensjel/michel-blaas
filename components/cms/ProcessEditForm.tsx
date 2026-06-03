"use client";

import { useState, useActionState } from "react";
import type { ProcessData } from "@/lib/cms-store";
import { home } from "@/content/home";
import BilingualField from "./BilingualField";
import SubmitButton from "./SubmitButton";

type StepBody = { num: string; body: { nl: string; en: string } };

export default function ProcessEditForm({
  data,
  action,
}: {
  data: ProcessData;
  action: (_prev: unknown, fd: FormData) => Promise<{ ok: boolean }>;
}) {
  const initialSteps: StepBody[] = home.process.steps.map((s) => {
    const stored = data.steps.find((d) => d.num === s.num);
    return { num: s.num, body: stored ? stored.body : s.body };
  });

  const [steps, setSteps] = useState<StepBody[]>(initialSteps);
  const [state, formAction] = useActionState(action, null);

  function updateBody(i: number, lang: "nl" | "en", val: string) {
    setSteps((prev) =>
      prev.map((s, j) => (j === i ? { ...s, body: { ...s.body, [lang]: val } } : s))
    );
  }

  const stepTitles = home.process.steps.map((s) =>
    typeof s.title === "string" ? s.title : ""
  );

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <input type="hidden" name="steps_json" value={JSON.stringify(steps)} />

      {steps.map((step, i) => (
        <section
          key={step.num}
          style={{
            padding: 16,
            border: "1px solid var(--color-rule)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              marginBottom: 2,
            }}
          >
            Stap {step.num}
            {stepTitles[i] ? ` — ${stepTitles[i]}` : ""}
          </p>
          <BilingualField
            nameNl={`step_${i}_body_nl`}
            nameEn={`step_${i}_body_en`}
            valueNl={step.body.nl}
            valueEn={step.body.en}
            onChangeNl={(v) => updateBody(i, "nl", v)}
            onChangeEn={(v) => updateBody(i, "en", v)}
          />
        </section>
      ))}

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
