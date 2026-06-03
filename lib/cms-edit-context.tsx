"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CmsEditContext = createContext(false);

export function CmsEditProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.self !== window.top) {
      setEditMode(true);
    }
  }, []);

  return (
    <CmsEditContext.Provider value={editMode}>
      {children}
    </CmsEditContext.Provider>
  );
}

export function useCmsEditMode() {
  return useContext(CmsEditContext);
}
