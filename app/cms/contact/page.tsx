import { getContact } from "@/lib/cms-store";
import { updateContact } from "@/app/cms/actions";
import ContactEditForm from "@/components/cms/ContactEditForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const data = await getContact();

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
        № 03 — Beheer
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
        Contact
      </h1>

      <ContactEditForm data={data} action={updateContact} />
    </main>
  );
}
