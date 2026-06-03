import { getStudio } from "@/lib/cms-store";
import { updateStudio } from "@/app/cms/actions";
import StudioEditForm from "@/components/cms/StudioEditForm";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  const data = getStudio();

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
        № 02 — Beheer
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
        Studio
      </h1>

      <StudioEditForm data={data} action={updateStudio} />
    </main>
  );
}
