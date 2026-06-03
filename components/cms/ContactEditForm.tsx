"use client";

import { useState } from "react";
import type { ContactData } from "@/lib/cms-store";

type Channel = ContactData["channels"][number];

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
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 4,
  display: "block",
};

export default function ContactEditForm({
  data,
  action,
}: {
  data: ContactData;
  action: (fd: FormData) => Promise<void>;
}) {
  const [channels, setChannels] = useState<Channel[]>(data.channels);

  function addChannel() {
    setChannels((c) => [...c, { abbr: "", label: { nl: "", en: "" }, href: "", arrow: "↗" }]);
  }

  function removeChannel(i: number) {
    setChannels((c) => c.filter((_, j) => j !== i));
  }

  function updateChannel(i: number, key: keyof Channel | "label_nl" | "label_en", val: string) {
    setChannels((c) =>
      c.map((ch, j) => {
        if (j !== i) return ch;
        if (key === "label_nl") return { ...ch, label: { ...ch.label, nl: val } };
        if (key === "label_en") return { ...ch, label: { ...ch.label, en: val } };
        return { ...ch, [key]: val };
      })
    );
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <input type="hidden" name="channels_json" value={JSON.stringify(channels)} />

      {/* Email */}
      <div>
        <span style={{ ...labelStyle, fontSize: 10, color: "var(--color-text)" }}>E-mail</span>
        <input name="email" defaultValue={data.email} style={fieldStyle} />
      </div>

      {/* Reply */}
      <section>
        <p style={{ ...labelStyle, fontSize: 10, marginBottom: 14, color: "var(--color-text)" }}>
          Reactietijd
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <span style={labelStyle}>NL</span>
            <input name="reply_nl" defaultValue={data.reply.nl} style={fieldStyle} />
          </div>
          <div>
            <span style={labelStyle}>EN</span>
            <input name="reply_en" defaultValue={data.reply.en} style={fieldStyle} />
          </div>
        </div>
      </section>

      {/* Channels */}
      <section>
        <p style={{ ...labelStyle, fontSize: 10, marginBottom: 14, color: "var(--color-text)" }}>
          Kanalen
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {channels.map((ch, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                border: "1px solid var(--color-rule)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...labelStyle, marginBottom: 0 }}>Kanaal {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeChannel(i)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Verwijder
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 40px", gap: 10 }}>
                <div>
                  <span style={labelStyle}>Afk.</span>
                  <input
                    value={ch.abbr}
                    onChange={(e) => updateChannel(i, "abbr", e.target.value)}
                    style={fieldStyle}
                    maxLength={4}
                  />
                </div>
                <div>
                  <span style={labelStyle}>URL</span>
                  <input
                    value={ch.href}
                    onChange={(e) => updateChannel(i, "href", e.target.value)}
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <span style={labelStyle}>Pijl</span>
                  <input
                    value={ch.arrow}
                    onChange={(e) => updateChannel(i, "arrow", e.target.value)}
                    style={fieldStyle}
                    maxLength={2}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>Label NL</span>
                <input
                  value={ch.label.nl}
                  onChange={(e) => updateChannel(i, "label_nl", e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <span style={labelStyle}>Label EN</span>
                <input
                  value={ch.label.en}
                  onChange={(e) => updateChannel(i, "label_en", e.target.value)}
                  style={fieldStyle}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addChannel}
          style={{
            marginTop: 10,
            background: "none",
            border: "1px dashed var(--color-rule)",
            padding: "8px 14px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            width: "100%",
          }}
        >
          + Kanaal
        </button>
      </section>

      <button
        type="submit"
        style={{
          padding: "11px 24px",
          background: "var(--color-text)",
          color: "var(--color-bg)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Opslaan
      </button>
    </form>
  );
}
