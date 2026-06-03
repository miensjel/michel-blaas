import { getWork, getWorks } from "@/lib/cms-store";
import { createWork, updateWork } from "@/app/cms/actions";
import CmsSidebar from "@/components/cms/CmsSidebar";
import WorkEditForm from "@/components/cms/WorkEditForm";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WorkPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const isNew = id === "new";

  const work = isNew ? null : (getWork(id) ?? null);
  if (!isNew && !work) notFound();

  const action = isNew ? createWork : updateWork.bind(null, id);

  return (
    <div
      style={{ minHeight: "100dvh", display: "flex", background: "var(--color-bg)" }}
    >
      <CmsSidebar active="works" />

      <main style={{ flex: 1, padding: "44px 48px", overflowY: "auto" }}>
        {/* Breadcrumb */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: 6,
          }}
        >
          <Link
            href="/cms/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Werken
          </Link>
          {" → "}
          {isNew ? "Nieuw" : work!.title}
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(24px, 3vw, 40px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "var(--color-text)",
            marginBottom: 36,
          }}
        >
          {isNew ? "Werk toevoegen" : work!.title}
        </h1>

        <WorkEditForm work={work} action={action} />
      </main>
    </div>
  );
}
