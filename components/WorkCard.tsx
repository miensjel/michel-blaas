"use client";

import { useState, useRef } from "react";
import ThreeCanvas from "@/components/ThreeCanvas";
import Reveal from "@/components/Reveal";
import { useCmsEditMode } from "@/lib/cms-edit-context";
import type { WorkItem } from "@/lib/cms-store";

const colSpan: Record<string, number> = { lg: 7, md: 5, sm: 4 };

const SIZES = ["sm", "md", "lg"] as const;

interface Props {
  item: WorkItem;
  dragProps?: React.HTMLAttributes<HTMLElement>;
  onUpdate?: (item: WorkItem) => void;
}

export default function WorkCard({ item, dragProps, onUpdate }: Props) {
  const editMode = useCmsEditMode();
  const [local, setLocal] = useState<WorkItem>(item);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const titleRef = useRef<HTMLSpanElement>(null);
  const bodyNlRef = useRef<HTMLSpanElement>(null);
  const bodyEnRef = useRef<HTMLSpanElement>(null);

  // Sync when parent changes item (e.g. after reorder)
  const prevIdRef = useRef(item.id);
  if (item.id !== prevIdRef.current) {
    prevIdRef.current = item.id;
    setLocal(item);
  }

  async function saveWork(updated: WorkItem) {
    setSaving(true);
    setSaved(false);
    const res = await fetch(`/api/cms/works/${updated.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (onUpdate) onUpdate(updated);
    }
  }

  function handleInlineBlur(
    ref: React.RefObject<HTMLSpanElement | null>,
    apply: (val: string) => WorkItem
  ) {
    const val = ref.current?.innerText.trim() ?? "";
    const updated = apply(val);
    if (JSON.stringify(updated) !== JSON.stringify(local)) {
      setLocal(updated);
      saveWork(updated);
    }
  }

  function changeSize(s: WorkItem["size"]) {
    const updated = { ...local, size: s };
    setLocal(updated);
    saveWork(updated);
  }

  const isEditing = editMode;

  return (
    <Reveal
      as="article"
      {...(dragProps as React.HTMLAttributes<HTMLDivElement>)}
      style={{
        gridColumn: `span ${colSpan[local.size] ?? 4}`,
        position: "relative",
        background: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        outline: isEditing ? "2px dashed rgba(var(--color-accent-rgb, 180,100,60),0.45)" : undefined,
        ...(dragProps as React.CSSProperties | undefined),
      } as React.CSSProperties}
    >
      {/* ── Edit mode bar ─────────────────────────────── */}
      {isEditing && (
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {/* Size selector */}
          <div
            style={{
              display: "flex",
              gap: 3,
              background: "rgba(26,24,21,0.75)",
              backdropFilter: "blur(6px)",
              borderRadius: "999px",
              padding: "3px 5px",
              pointerEvents: "auto",
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => changeSize(s)}
                style={{
                  background: local.size === s ? "var(--color-bg)" : "transparent",
                  color: local.size === s ? "var(--color-text)" : "rgba(235,229,219,0.55)",
                  border: "none",
                  borderRadius: "999px",
                  padding: "3px 8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Edit / Save indicator + drag handle */}
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              pointerEvents: "auto",
            }}
          >
            {saving && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  color: "rgba(235,229,219,0.55)",
                  background: "rgba(26,24,21,0.75)",
                  padding: "3px 8px",
                  borderRadius: "999px",
                }}
              >
                ...
              </span>
            )}
            {saved && !saving && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  color: "#7ecb9a",
                  background: "rgba(26,24,21,0.75)",
                  padding: "3px 8px",
                  borderRadius: "999px",
                }}
              >
                ✓
              </span>
            )}
            <button
              onClick={() => setPanelOpen((v) => !v)}
              style={{
                background: panelOpen ? "var(--color-text)" : "rgba(26,24,21,0.75)",
                backdropFilter: "blur(6px)",
                color: "var(--color-bg)",
                border: "none",
                borderRadius: "999px",
                padding: "4px 10px",
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {panelOpen ? "↑ Sluit" : "✎"}
            </button>
            {/* Drag handle */}
            <div
              style={{
                background: "rgba(26,24,21,0.75)",
                backdropFilter: "blur(6px)",
                borderRadius: "999px",
                padding: "4px 8px",
                color: "rgba(235,229,219,0.6)",
                fontSize: 12,
                cursor: "grab",
                lineHeight: 1,
              }}
            >
              ⠿
            </div>
          </div>
        </div>
      )}

      {/* ── Canvas ────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "5/4",
          cursor: dragProps ? "grab" : "default",
        }}
      >
        <ThreeCanvas
          model={local.model}
          dist={local.dist}
          height={local.height}
          speed={local.speed}
          bg={local.bg}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-text)",
            padding: "6px 10px",
            background: "rgba(235,229,219,0.7)",
            backdropFilter: "blur(4px)",
            borderRadius: "999px",
          }}
        >
          <span lang="nl">{local.category.nl}</span>
          <span lang="en">{local.category.en}</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--color-text-soft)",
            letterSpacing: "0.08em",
          }}
        >
          {local.year}
        </div>
      </div>

      {/* ── Info ──────────────────────────────────────── */}
      <div
        style={{
          padding: "20px 22px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          borderTop: "1px solid rgba(26,24,21,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 32,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {/* Title — contenteditable in edit mode */}
            <span
              ref={titleRef}
              contentEditable={isEditing ? true : undefined}
              suppressContentEditableWarning
              onBlur={
                isEditing
                  ? () =>
                      handleInlineBlur(titleRef, (v) => ({ ...local, title: v }))
                  : undefined
              }
              style={{
                outline: "none",
                cursor: isEditing ? "text" : undefined,
                borderBottom: isEditing ? "1px dashed var(--color-accent)" : undefined,
              }}
            >
              {local.title}
            </span>{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              <span lang="nl">{local.subtitle.nl}</span>
              <span lang="en">{local.subtitle.en}</span>
            </em>
          </h3>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              color: "var(--color-text-soft)",
              letterSpacing: "0.08em",
            }}
          >
            <span lang="nl">{local.status.nl}</span>
            <span lang="en">{local.status.en}</span>
          </span>
        </div>

        {/* Body — contenteditable in edit mode */}
        <p
          style={{
            fontSize: "13.5px",
            lineHeight: 1.55,
            color: "var(--color-text-soft)",
            maxWidth: "46ch",
          }}
        >
          <span
            lang="nl"
            ref={bodyNlRef}
            contentEditable={isEditing ? true : undefined}
            suppressContentEditableWarning
            onBlur={
              isEditing
                ? () =>
                    handleInlineBlur(
                      bodyNlRef,
                      (v) => ({ ...local, body: { ...local.body, nl: v } })
                    )
                : undefined
            }
            style={{
              outline: "none",
              cursor: isEditing ? "text" : undefined,
              display: "block",
              borderBottom: isEditing ? "1px dashed var(--color-accent)" : undefined,
            }}
          >
            {local.body.nl}
          </span>
          <span
            lang="en"
            ref={bodyEnRef}
            contentEditable={isEditing ? true : undefined}
            suppressContentEditableWarning
            onBlur={
              isEditing
                ? () =>
                    handleInlineBlur(
                      bodyEnRef,
                      (v) => ({ ...local, body: { ...local.body, en: v } })
                    )
                : undefined
            }
            style={{
              outline: "none",
              cursor: isEditing ? "text" : undefined,
              display: "block",
              borderBottom: isEditing ? "1px dashed var(--color-accent)" : undefined,
            }}
          >
            {local.body.en}
          </span>
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
          {local.specs.map((spec, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text)",
                padding: "4px 9px",
                border: "1px solid var(--color-text)",
                borderRadius: "999px",
              }}
            >
              <span lang="nl">{spec.nl}</span>
              <span lang="en">{spec.en}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Inline edit panel ─────────────────────────── */}
      {isEditing && panelOpen && (
        <div
          style={{
            padding: "16px 20px 20px",
            background: "var(--color-text)",
            color: "var(--color-bg)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderTop: "2px solid var(--color-accent)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(235,229,219,0.45)",
              marginBottom: 2,
            }}
          >
            Snel bewerken
          </p>

          {/* Model */}
          <div>
            <label style={panelLabel}>3D-model</label>
            <select
              value={local.model}
              onChange={(e) => {
                const updated = { ...local, model: e.target.value as WorkItem["model"] };
                setLocal(updated);
                saveWork(updated);
              }}
              style={panelField}
            >
              {["chair","lamp","vase","speaker","stool","kettle","monolith","bust"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label style={panelLabel}>Titel</label>
            <input
              value={local.title}
              onChange={(e) => setLocal((l) => ({ ...l, title: e.target.value }))}
              onBlur={() => saveWork(local)}
              style={panelField}
            />
          </div>

          {/* Body NL */}
          <div>
            <label style={panelLabel}>Beschrijving NL</label>
            <textarea
              value={local.body.nl}
              onChange={(e) =>
                setLocal((l) => ({ ...l, body: { ...l.body, nl: e.target.value } }))
              }
              onBlur={() => saveWork(local)}
              rows={3}
              style={{ ...panelField, resize: "vertical" }}
            />
          </div>

          {/* Body EN */}
          <div>
            <label style={panelLabel}>Description EN</label>
            <textarea
              value={local.body.en}
              onChange={(e) =>
                setLocal((l) => ({ ...l, body: { ...l.body, en: e.target.value } }))
              }
              onBlur={() => saveWork(local)}
              rows={3}
              style={{ ...panelField, resize: "vertical" }}
            />
          </div>

          {/* Year */}
          <div>
            <label style={panelLabel}>Jaar</label>
            <input
              value={local.year}
              onChange={(e) => setLocal((l) => ({ ...l, year: e.target.value }))}
              onBlur={() => saveWork(local)}
              style={panelField}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
            <button
              onClick={() => saveWork(local)}
              disabled={saving}
              style={{
                padding: "7px 16px",
                background: "var(--color-bg)",
                color: "var(--color-text)",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {saving ? "..." : "Opslaan"}
            </button>
            {saved && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#7ecb9a" }}>
                ✓ Opgeslagen
              </span>
            )}
          </div>
        </div>
      )}
    </Reveal>
  );
}

const panelLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 8.5,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(235,229,219,0.45)",
  marginBottom: 4,
};

const panelField: React.CSSProperties = {
  width: "100%",
  padding: "7px 9px",
  background: "rgba(235,229,219,0.08)",
  border: "1px solid rgba(235,229,219,0.18)",
  color: "var(--color-bg)",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  lineHeight: 1.4,
  boxSizing: "border-box",
};
