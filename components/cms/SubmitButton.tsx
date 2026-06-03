"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label = "Opslaan" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "11px 24px",
        background: pending ? "var(--color-muted)" : "var(--color-text)",
        color: "var(--color-bg)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        border: "none",
        cursor: pending ? "wait" : "pointer",
        alignSelf: "flex-start",
        transition: "background 0.2s",
      }}
    >
      {pending ? "Opslaan..." : label}
    </button>
  );
}
