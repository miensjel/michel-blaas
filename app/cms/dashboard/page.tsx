import { getWorks } from "@/lib/cms-store";
import Link from "next/link";
import WorksList from "@/components/cms/WorksList";

export const dynamic = "force-dynamic";

export default async function CmsDashboard() {
  const works = await getWorks();

  return (
    <main style={{ padding: "44px 40px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <div>
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
            № 01 — Beheer
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "var(--color-text)",
            }}
          >
            Werken
          </h1>
        </div>
        <Link
          href="/cms/works/new"
          style={{
            padding: "10px 20px",
            background: "var(--color-accent)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          + Nieuw
        </Link>
      </div>

      <WorksList initialWorks={works} />

      <p
        style={{
          marginTop: 40,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "var(--color-muted)",
          opacity: 0.55,
          lineHeight: 1.7,
        }}
      >
        Opgeslagen in{" "}
        <code style={{ fontFamily: "var(--font-mono)" }}>data/works.json</code>
        .<br />
        Commit en push om live te updaten.
      </p>
    </main>
  );
}
