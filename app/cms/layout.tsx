"use client";

import { usePathname } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import CmsPreview from "@/components/cms/CmsPreview";

function getPreviewHref(pathname: string): string {
  if (pathname === "/cms/dashboard" || pathname.startsWith("/cms/works")) return "/#werk";
  if (pathname.startsWith("/cms/studio")) return "/#studio";
  if (pathname.startsWith("/cms/contact")) return "/#contact";
  if (pathname.startsWith("/cms/process")) return "/#proces";
  return "/";
}

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/cms") return <>{children}</>;

  const previewHref = getPreviewHref(pathname);

  return (
    <div style={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      <CmsSidebar />
      <div
        style={{
          width: 480,
          flexShrink: 0,
          overflowY: "auto",
          background: "var(--color-bg)",
          borderRight: "1px solid var(--color-rule)",
        }}
      >
        {children}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <CmsPreview href={previewHref} />
      </div>
    </div>
  );
}
