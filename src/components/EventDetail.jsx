import React from "react";
import { X, MapPin, Clock, Users, DollarSign, Star, Check, UserPlus } from "lucide-react";

export default function EventDetail({
  event,
  saved,
  registered,
  interested,
  goTogetherCount,
  onToggleSave,
  onToggleRegister,
  onToggleGoTogether,
  onClose,
}) {
  const Icon = event.icon;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="modal__icon">
          <Icon size={22} />
        </div>
        <span className="tag-mono">
          {event.culture} · {event.kind}
        </span>
        <h2>{event.title}</h2>
        <div className="meta-row">
          <MapPin size={14} /> {event.location}
        </div>
        <div className="meta-row">
          <Clock size={14} /> {event.date} · {event.time}
        </div>
        <div className="meta-row">
          <Users size={14} /> Organised by {event.organiser}
        </div>
        <div className="meta-row">
          <DollarSign size={14} /> {event.cost}
        </div>

        <p className="modal__desc">{event.description}</p>

        <div className="modal__actions">
          <button
            className={"icon-btn icon-btn--bordered" + (saved ? " icon-btn--gold" : "")}
            onClick={() => onToggleSave(event.id)}
          >
            <Star size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
          </button>
          <button className={"pill-btn" + (registered ? " pill-btn--done" : "")} onClick={() => onToggleRegister(event.id)}>
            {registered ? (
              <>
                <Check size={14} /> Registered
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>

        <div className="go-together">
          <div className="go-together__head">
            <UserPlus size={15} />
            <div>
              <strong>Going alone? Find someone to go with.</strong>
              <p>{goTogetherCount} verified people are interested in this event.</p>
            </div>
          </div>
          <button
            className={"pill-btn pill-btn--outline" + (interested ? " pill-btn--done" : "")}
            onClick={() => onToggleGoTogether(event.id)}
          >
            {interested ? "You're interested in going together" : "I'm interested in going with others"}
          </button>
        </div>
      </div>
    </div>
  );
}
