"use client";

import { useState } from "react";

interface Props {
  label?: string;
  nameNl: string;
  nameEn: string;
  valueNl: string;
  valueEn: string;
  onChangeNl: (v: string) => void;
  onChangeEn: (v: string) => void;
  rows?: number;
  type?: "input" | "textarea";
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-rule)",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  color: "var(--color-text)",
  lineHeight: 1.5,
  boxSizing: "border-box",
  resize: "vertical",
};

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

export default function BilingualField({
  label,
  nameNl,
  nameEn,
  valueNl,
  valueEn,
  onChangeNl,
  onChangeEn,
  rows = 3,
  type = "textarea",
}: Props) {
  const [loadingDir, setLoadingDir] = useState<"nl" | "en" | null>(null);

  async function translate(from: "nl" | "en") {
    const text = from === "nl" ? valueNl : valueEn;
    const to = from === "nl" ? "en" : "nl";
    if (!text.trim()) return;
    setLoadingDir(to);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, from, to }),
      });
      const data = (await res.json()) as { translation?: string; error?: string };
      if (data.translation) {
        if (to === "nl") onChangeNl(data.translation);
        else onChangeEn(data.translation);
      }
    } finally {
      setLoadingDir(null);
    }
  }

  async function handleBlur(lang: "nl" | "en") {
    const targetEmpty = lang === "nl" ? !valueEn.trim() : !valueNl.trim();
    if (targetEmpty) await translate(lang);
  }

  function renderField(
    lang: "nl" | "en",
    name: string,
    value: string,
    onChange: (v: string) => void
  ) {
    const otherLang = lang === "nl" ? "en" : "nl";
    const isLoading = loadingDir === lang;

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <span style={{ ...mono, color: "var(--color-muted)" }}>
            {isLoading ? "vertalen..." : lang.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={() => translate(otherLang)}
            disabled={loadingDir !== null || !(lang === "nl" ? valueEn : valueNl).trim()}
            style={{
              ...mono,
              color:
                loadingDir !== null || !(lang === "nl" ? valueEn : valueNl).trim()
                  ? "var(--color-rule)"
                  : "var(--color-muted)",
              background: "none",
              border: "none",
              cursor:
                loadingDir !== null || !(lang === "nl" ? valueEn : valueNl).trim()
                  ? "default"
                  : "pointer",
              padding: 0,
              fontSize: 8.5,
            }}
          >
            {lang === "nl" ? "← Vertaal uit EN" : "← Vertaal uit NL"}
          </button>
        </div>
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => handleBlur(lang)}
            rows={rows}
            style={fieldStyle}
          />
        ) : (
          <input
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => handleBlur(lang)}
            style={{ ...fieldStyle, resize: undefined }}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <p
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--color-text)",
            marginBottom: 12,
          }}
        >
          {label}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {renderField("nl", nameNl, valueNl, onChangeNl)}
        {renderField("en", nameEn, valueEn, onChangeEn)}
      </div>
    </div>
  );
}
