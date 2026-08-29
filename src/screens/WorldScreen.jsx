import React, { useMemo } from "react";
import { MapPin, ShieldCheck, Heart, PartyPopper, Utensils, Building2, Star, CalendarDays, CheckCircle2 } from "lucide-react";
import { COMMUNITIES } from "../data/mockData";
import SectionEyebrow from "../components/SectionEyebrow";
import BlockWall from "../components/BlockWall";
import EmptyState from "../components/EmptyState";

export default function WorldScreen({
  selectedCultures,
  registeredEvents,
  savedEvents,
  savedPlaces,
  joinedCommunities,
  events,
  places,
  verified,
  setVerified,
}) {
  const blocks = useMemo(() => {
    const b = [];
    selectedCultures.forEach((c) => b.push({ label: `${c} culture`, icon: Heart }));
    events.filter((e) => registeredEvents.has(e.id)).forEach((e) => b.push({ label: e.title, icon: PartyPopper }));
    places.filter((p) => savedPlaces.has(p.id)).forEach((p) => b.push({ label: p.name, icon: Utensils }));
    joinedCommunities.forEach((id) => {
      const c = COMMUNITIES.find((c) => c.id === id);
      if (c) b.push({ label: c.name, icon: Building2 });
    });
    events
      .filter((e) => savedEvents.has(e.id) && !registeredEvents.has(e.id))
      .forEach((e) => b.push({ label: `${e.title} (saved)`, icon: Star }));
    return b;
  }, [selectedCultures, registeredEvents, savedEvents, savedPlaces, joinedCommunities, events, places]);

  const upcoming = events.filter((e) => registeredEvents.has(e.id));
  const saved = events.filter((e) => savedEvents.has(e.id));

  return (
    <div className="screen">
      <div className="section">
        <SectionEyebrow>My World</SectionEyebrow>
        <div className="profile-card brick-card">
          <div className="profile-card__avatar">N</div>
          <div>
            <h3 style={{ margin: 0 }}>Noor</h3>
            <div className="meta-row">
              <MapPin size={13} /> Sydney
            </div>
            {verified ? (
              <span className="verified-badge" style={{ marginTop: 6 }}>
                <ShieldCheck size={13} /> Verified member
              </span>
            ) : (
              <button className="pill-btn pill-btn--outline" style={{ marginTop: 8 }} onClick={() => setVerified(true)}>
                Verify your account
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section__head">
          <SectionEyebrow>Your cultural world</SectionEyebrow>
          <span className="tag-mono">{blocks.length} blocks</span>
        </div>
        <BlockWall blocks={blocks} />
        <p className="wall__caption">
          {blocks.length === 0
            ? "Save a place, register for an event, or pick a culture on Home — every one becomes a block here."
            : "Your world is bigger than when you started. Every event, person and place adds another block."}
        </p>
      </div>

      <div className="section">
        <SectionEyebrow>Upcoming — My Calendar</SectionEyebrow>
        <div className="stack">
          {upcoming.length === 0 && <EmptyState text="Nothing on your calendar yet." />}
          {upcoming.map((e) => (
            <div className="brick-card place-row" key={e.id}>
              <div className="event-card__icon">
                <e.icon size={16} />
              </div>
              <div className="event-card__body">
                <h3 className="place-row__name">{e.title}</h3>
                <div className="meta-row">
                  <CalendarDays size={13} /> {e.date} · {e.time}
                </div>
              </div>
              <CheckCircle2 size={16} className="check-icon" />
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <SectionEyebrow>Saved</SectionEyebrow>
        <div className="stack">
          {saved.length === 0 && <EmptyState text="Nothing saved yet." />}
          {saved.map((e) => (
            <div className="brick-card place-row" key={e.id}>
              <div className="event-card__icon">
                <Star size={16} />
              </div>
              <div className="event-card__body">
                <h3 className="place-row__name">{e.title}</h3>
                <div className="meta-row">
                  <MapPin size={13} /> {e.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
