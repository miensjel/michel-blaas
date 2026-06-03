import { getWorks } from "@/lib/cms-store";
import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import DeleteWorkButton from "@/components/cms/DeleteWorkButton";

export const dynamic = "force-dynamic";

export default function CmsDashboard() {
  const works = getWorks();

  return (
    <div
      style={{ minHeight: "100dvh", display: "flex", background: "var(--color-bg)" }}
    >
      <CmsSidebar active="works" />

      <main style={{ flex: 1, padding: "44px 48px", overflowY: "auto" }}>
        {/* Header */}
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
              padding: "10px 22px",
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
            + Nieuw werk
          </Link>
        </div>

        {/* Works table */}
        <div style={{ borderTop: "1px solid var(--color-text)" }}>
          {works.length === 0 && (
            <p
              style={{
                padding: "28px 0",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-muted)",
              }}
            >
              Geen werken. Voeg je eerste werk toe ↑
            </p>
          )}

          {works.map((work, i) => (
            <div
              key={work.id}
              style={{
                display: "grid",
                gridTemplateColumns: "36px 1fr 80px 80px 100px 80px",
                alignItems: "center",
                gap: 20,
                padding: "14px 0",
                borderBottom: "1px solid var(--color-rule)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--color-text)",
                    marginBottom: 2,
                  }}
                >
                  {work.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "var(--color-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {work.category.nl} · {work.year}
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {work.model}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {work.size}
              </span>

              <Link
                href={`/cms/works/${work.id}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  border: "1px solid var(--color-text)",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                Bewerk
              </Link>

              <DeleteWorkButton id={work.id} />
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: 48,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--color-muted)",
            opacity: 0.6,
            lineHeight: 1.7,
          }}
        >
          Wijzigingen worden opgeslagen in{" "}
          <code style={{ fontFamily: "var(--font-mono)" }}>data/works.json</code>
          .<br />
          Commit en push om de live site te updaten.
        </p>
      </main>
    </div>
  );
}
