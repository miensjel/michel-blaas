"use client";

import { usePathname } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import CmsPreview from "@/components/cms/CmsPreview";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/cms") return <>{children}</>;

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
        <CmsPreview />
      </div>
    </div>
  );
}
