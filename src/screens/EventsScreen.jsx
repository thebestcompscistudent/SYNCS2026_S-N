import React, { useMemo, useState } from "react";
import SectionEyebrow from "../components/SectionEyebrow";
import Chip from "../components/Chip";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";

const SUB_TABS = [
  ["browse", "Browse"],
  ["saved", "⭐ Saved"],
  ["registered", "✅ Registered"],
];

export default function EventsScreen({ events, savedEvents, registeredEvents, toggleSave, toggleRegister, openEvent }) {
  const [sub, setSub] = useState("browse");
  const [kindFilter, setKindFilter] = useState("All");

  const list = useMemo(() => {
    let base = events;
    if (sub === "saved") base = events.filter((e) => savedEvents.has(e.id));
    if (sub === "registered") base = events.filter((e) => registeredEvents.has(e.id));
    if (kindFilter !== "All") base = base.filter((e) => e.kind === kindFilter);
    return base;
  }, [events, sub, kindFilter, savedEvents, registeredEvents]);

  return (
    <div className="screen">
      <div className="section">
        <SectionEyebrow>Events</SectionEyebrow>
        <h1 className="screen-title">Cultural &amp; social events</h1>
      </div>

      <div className="section">
        <div className="tab-row">
          {SUB_TABS.map(([id, label]) => (
            <button key={id} className={"tab-btn" + (sub === id ? " tab-btn--active" : "")} onClick={() => setSub(id)}>
              {label}
            </button>
          ))}
        </div>
        {sub === "browse" && (
          <div className="chip-row" style={{ marginTop: 10 }}>
            {["All", "Cultural", "Social"].map((k) => (
              <Chip key={k} active={kindFilter === k} onClick={() => setKindFilter(k)}>
                {k}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div className="section stack">
        {list.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            saved={savedEvents.has(e.id)}
            registered={registeredEvents.has(e.id)}
            onToggleSave={toggleSave}
            onToggleRegister={toggleRegister}
            onOpen={openEvent}
          />
        ))}
        {list.length === 0 && (
          <EmptyState
            text={
              sub === "saved"
                ? "Nothing saved yet — tap the star on an event to keep it here."
                : "No registrations yet — register for something and it'll land on your calendar."
            }
          />
        )}
      </div>
    </div>
  );
}
