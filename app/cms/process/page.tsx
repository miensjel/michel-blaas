import { getProcess } from "@/lib/cms-store";
import { updateProcess } from "@/app/cms/actions";
import ProcessEditForm from "@/components/cms/ProcessEditForm";

export const dynamic = "force-dynamic";

export default function ProcessPage() {
  const data = getProcess();

  return (
    <main style={{ padding: "44px 40px" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: 6,
        }}
      >
        № 04 — Beheer
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(28px, 3.5vw, 40px)",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: "var(--color-text)",
          marginBottom: 36,
        }}
      >
        Proces
      </h1>

      <ProcessEditForm data={data} action={updateProcess} />
    </main>
  );
}
