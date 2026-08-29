import React from "react";
import { MapPin, Clock, Star, Check } from "lucide-react";

export default function EventCard({ event, saved, registered, onToggleSave, onToggleRegister, onOpen }) {
  const Icon = event.icon;
  return (
    <article className="brick-card event-card" onClick={() => onOpen(event)}>
      <div className="event-card__icon">
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="event-card__body">
        <div className="event-card__top">
          <span className="tag-mono">{event.culture}</span>
          <span className="tag-mono tag-mono--muted">{event.kind}</span>
        </div>
        <h3>{event.title}</h3>
        <div className="meta-row">
          <MapPin size={13} /> <span>{event.location}</span>
        </div>
        <div className="meta-row">
          <Clock size={13} /> <span>{event.date} · {event.time}</span>
        </div>
      </div>
      <div className="event-card__actions" onClick={(e) => e.stopPropagation()}>
        <button
          className={"icon-btn" + (saved ? " icon-btn--gold" : "")}
          onClick={() => onToggleSave(event.id)}
          aria-label="Save event"
          title="Save"
        >
          <Star size={16} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          className={"pill-btn" + (registered ? " pill-btn--done" : "")}
          onClick={() => onToggleRegister(event.id)}
        >
          {registered ? (
            <>
              <Check size={13} /> Registered
            </>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </article>
  );
}
