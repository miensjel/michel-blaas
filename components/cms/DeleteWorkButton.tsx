"use client";

import { useTransition } from "react";
import { deleteWork } from "@/app/cms/actions";

export default function DeleteWorkButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (!confirm(`"${id}" verwijderen?`)) return;
        startTransition(() => deleteWork(id));
      }}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-muted)",
        background: "none",
        border: "none",
        cursor: pending ? "wait" : "pointer",
        padding: "6px 0",
        opacity: pending ? 0.4 : 1,
      }}
    >
      {pending ? "..." : "Verwijder"}
    </button>
  );
}
