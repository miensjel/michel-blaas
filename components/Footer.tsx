import Link from "next/link";

interface Props {
  page?: string;
  backHref?: string;
  backLabel?: { nl: string; en: string };
}

export default function Footer({ page, backHref, backLabel }: Props) {
  return (
    <footer
      style={{
        padding:             "32px 48px 24px",
        borderTop:           "1px solid var(--color-text)",
        display:             "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems:          "end",
        gap:                 32,
        fontFamily:          "var(--font-mono)",
        fontSize:            10,
        textTransform:       "uppercase",
        letterSpacing:       "0.08em",
        color:               "var(--color-text-soft)",
      }}
    >
      <div
        style={{
          fontFamily:    "var(--font-display)",
          fontStyle:     "italic",
          fontSize:      "clamp(60px,12vw,200px)",
          color:         "var(--color-text)",
          lineHeight:    0.85,
          letterSpacing: "-0.04em",
          gridColumn:    "1 / -1",
          marginBottom:  32,
        }}
      >
        Michel.
      </div>

      <div>
        <div>© 2026 Michel Blaas</div>
        <div>
          <span lang="nl">Onafhankelijk ontwerper</span>
          <span lang="en">Independent designer</span>
        </div>
      </div>

      <div>
        <div>Delft · NL</div>
        <div>
          <span lang="nl">Op zoek naar atelierruimte</span>
          <span lang="en">Looking for studio space</span>
        </div>
      </div>

      <div style={{ justifySelf: "end", textAlign: "right" }}>
        {page && (
          <div>
            <span lang="nl">{page}</span>
            <span lang="en">{page}</span>
          </div>
        )}
        {backHref && backLabel && (
          <div>
            <Link href={backHref} style={{ color: "inherit", textDecoration: "none" }}>
              <span lang="nl">{backLabel.nl}</span>
              <span lang="en">{backLabel.en}</span>
            </Link>
          </div>
        )}
        {!backHref && (
          <>
            <div>
              <span lang="nl">Site gebouwd 2026</span>
              <span lang="en">Site built 2026</span>
            </div>
            <div>
              <span lang="nl">Interactief 3D — sleep om te draaien</span>
              <span lang="en">Interactive 3D — drag to rotate</span>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
