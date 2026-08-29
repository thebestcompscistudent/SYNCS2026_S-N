import React, { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { CULTURES } from "../data/mockData";
import Chip from "../components/Chip";
import SectionEyebrow from "../components/SectionEyebrow";
import EventCard from "../components/EventCard";
import PlaceRow from "../components/PlaceRow";
import EmptyState from "../components/EmptyState";

export default function HomeScreen({
  selectedCultures,
  toggleCulture,
  events,
  places,
  savedEvents,
  registeredEvents,
  toggleSave,
  toggleRegister,
  openEvent,
  goTo,
}) {
  const nearby = useMemo(() => {
    if (selectedCultures.length === 0) return events.slice(0, 3);
    return events.filter((e) => selectedCultures.includes(e.culture)).slice(0, 4);
  }, [events, selectedCultures]);

  const placesToExplore = useMemo(() => {
    if (selectedCultures.length === 0) return places.slice(0, 3);
    return places.filter((p) => selectedCultures.includes(p.cuisine)).slice(0, 4);
  }, [places, selectedCultures]);

  return (
    <div className="screen">
      <div className="hero">
        <SectionEyebrow>Your cultural world</SectionEyebrow>
        <h1>
          Find your people.
          <br />
          Discover your culture.
          <br />
          Build your world.
        </h1>
        <p className="hero__sub">
          Culture exists around us — pick a few threads below and we'll surface the blocks that connect to them.
        </p>
      </div>

      <div className="section">
        <SectionEyebrow>I'm interested in</SectionEyebrow>
        <div className="chip-row">
          {CULTURES.map((c) => (
            <Chip key={c.name} active={selectedCultures.includes(c.name)} onClick={() => toggleCulture(c.name)}>
              {c.flag} {c.name}
            </Chip>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section__head">
          <SectionEyebrow>Happening near you</SectionEyebrow>
          <button className="link-btn" onClick={() => goTo("events")}>
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="stack">
          {nearby.map((e) => (
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
          {nearby.length === 0 && <EmptyState text="No events match yet — try selecting a culture above." />}
        </div>
      </div>

      <div className="section">
        <div className="section__head">
          <SectionEyebrow>Places to explore</SectionEyebrow>
          <button className="link-btn" onClick={() => goTo("explore")}>
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="stack">
          {placesToExplore.map((p) => (
            <PlaceRow key={p.id} place={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
