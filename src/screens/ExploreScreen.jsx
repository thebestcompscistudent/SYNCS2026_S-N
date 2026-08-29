import React, { useState } from "react";
import { MapPin, PartyPopper, Utensils, Building2, Users, Bookmark } from "lucide-react";
import SectionEyebrow from "../components/SectionEyebrow";
import Chip from "../components/Chip";

const MAP_PINS = [
  { top: "22%", left: "30%", label: "🎉" },
  { top: "48%", left: "62%", label: "🍜" },
  { top: "68%", left: "40%", label: "🏛" },
  { top: "35%", left: "78%", label: "📚" },
  { top: "58%", left: "18%", label: "🎉" },
];

const CATEGORIES = [
  { id: "events", label: "Events", icon: PartyPopper },
  { id: "food", label: "Food", icon: Utensils },
  { id: "community", label: "Community", icon: Building2 },
];

export default function ExploreScreen({ places, events, communities, savedPlaces, toggleSavePlace }) {
  const [category, setCategory] = useState("events");

  return (
    <div className="screen">
      <div className="section">
        <SectionEyebrow>Explore</SectionEyebrow>
        <h1 className="screen-title">Cultural blocks around you</h1>
      </div>

      <div className="map-frame">
        <div className="map-frame__grid" />
        {MAP_PINS.map((pin, i) => (
          <div className="map-pin" style={{ top: pin.top, left: pin.left }} key={i}>
            {pin.label}
          </div>
        ))}
        <div className="map-frame__caption">
          <MapPin size={13} /> Showing cultural experiences within 5km of Sydney
        </div>
      </div>

      <div className="section">
        <div className="chip-row">
          {CATEGORIES.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              <c.icon size={13} style={{ marginRight: 4, verticalAlign: -2 }} />
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      {category === "events" && (
        <div className="section stack">
          {events.map((e) => (
            <div className="brick-card place-row" key={e.id}>
              <div className="event-card__icon">
                <e.icon size={17} />
              </div>
              <div className="event-card__body">
                <h3 className="place-row__name">{e.title}</h3>
                <div className="meta-row">
                  <MapPin size={13} /> <span>{e.location}</span>
                </div>
              </div>
              <span className="tag-mono">{e.culture}</span>
            </div>
          ))}
        </div>
      )}

      {category === "food" && (
        <div className="section stack">
          {places.map((p) => (
            <div className="brick-card place-row" key={p.id}>
              <div className="event-card__icon event-card__icon--teal">
                <p.icon size={17} />
              </div>
              <div className="event-card__body">
                <h3 className="place-row__name">{p.name}</h3>
                <div className="meta-row">
                  <MapPin size={13} /> <span>{p.area} · {p.cuisine}</span>
                </div>
              </div>
              <button
                className={"icon-btn" + (savedPlaces.has(p.id) ? " icon-btn--gold" : "")}
                onClick={() => toggleSavePlace(p.id)}
                aria-label="Save place"
              >
                <Bookmark size={16} fill={savedPlaces.has(p.id) ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
        </div>
      )}

      {category === "community" && (
        <div className="section stack">
          {communities.map((c) => (
            <div className="brick-card place-row" key={c.id}>
              <div className="event-card__icon event-card__icon--teal">
                <Building2 size={17} />
              </div>
              <div className="event-card__body">
                <h3 className="place-row__name">{c.name}</h3>
                <div className="meta-row">
                  <Users size={13} /> <span>{c.members} members · {c.culture}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
