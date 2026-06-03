"use client";

import { useState, useActionState } from "react";
import type { ContactData } from "@/lib/cms-store";
import BilingualField from "./BilingualField";
import SubmitButton from "./SubmitButton";

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

const monoLabel: React.CSSProperties = {
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
  action: (_prev: unknown, fd: FormData) => Promise<{ ok: boolean }>;
}) {
  const [email, setEmail] = useState(data.email);
  const [reply, setReply] = useState(data.reply);
  const [channels, setChannels] = useState<Channel[]>(data.channels);

  const [state, formAction] = useActionState(action, null);

  function addChannel() {
    setChannels((c) => [
      ...c,
      { abbr: "", label: { nl: "", en: "" }, href: "", arrow: "↗" },
    ]);
  }
  function removeChannel(i: number) {
    setChannels((c) => c.filter((_, j) => j !== i));
  }
  function updateChannel(
    i: number,
    key: keyof Channel | "label_nl" | "label_en",
    val: string
  ) {
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
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <input type="hidden" name="channels_json" value={JSON.stringify(channels)} />

      <div>
        <span
          style={{
            ...monoLabel,
            fontSize: 10,
            color: "var(--color-text)",
            marginBottom: 8,
          }}
        >
          E-mail
        </span>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={fieldStyle}
        />
      </div>

      <BilingualField
        label="Reactietijd"
        nameNl="reply_nl"
        nameEn="reply_en"
        valueNl={reply.nl}
        valueEn={reply.en}
        onChangeNl={(v) => setReply((r) => ({ ...r, nl: v }))}
        onChangeEn={(v) => setReply((r) => ({ ...r, en: v }))}
        type="input"
      />

      <section>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-text)",
            marginBottom: 14,
          }}
        >
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ ...monoLabel, marginBottom: 0 }}>Kanaal {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeChannel(i)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Verwijder
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 40px", gap: 10 }}>
                <div>
                  <span style={monoLabel}>Afk.</span>
                  <input
                    value={ch.abbr}
                    onChange={(e) => updateChannel(i, "abbr", e.target.value)}
                    style={fieldStyle}
                    maxLength={4}
                  />
                </div>
                <div>
                  <span style={monoLabel}>URL</span>
                  <input
                    value={ch.href}
                    onChange={(e) => updateChannel(i, "href", e.target.value)}
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <span style={monoLabel}>Pijl</span>
                  <input
                    value={ch.arrow}
                    onChange={(e) => updateChannel(i, "arrow", e.target.value)}
                    style={fieldStyle}
                    maxLength={2}
                  />
                </div>
              </div>
              <BilingualField
                nameNl={`ch_${i}_label_nl`}
                nameEn={`ch_${i}_label_en`}
                valueNl={ch.label.nl}
                valueEn={ch.label.en}
                onChangeNl={(v) => updateChannel(i, "label_nl", v)}
                onChangeEn={(v) => updateChannel(i, "label_en", v)}
                type="input"
                label="Label"
              />
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

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SubmitButton />
        {state?.ok && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            ✓ Opgeslagen
          </span>
        )}
      </div>
    </form>
  );
}
