import React, { useState, useMemo } from "react";
import {
  Home as HomeIcon,
  Compass,
  CalendarDays,
  Users,
  Boxes,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Check,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Flag,
  UserX,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  Utensils,
  BookOpen,
  PartyPopper,
  Building2,
  Heart,
  Sparkles,
  Bookmark,
  Send,
  UserPlus,
} from "lucide-react";

// MOCK DATA

const CULTURES = [
  { name: "Lebanese", flag: "🇱🇧" },
  { name: "Pakistani", flag: "🇵🇰" },
  { name: "Filipino", flag: "🇵🇭" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Vietnamese", flag: "🇻🇳" },
  { name: "Greek", flag: "🇬🇷" },
  { name: "Indian", flag: "🇮🇳" },
];

const EVENTS = [
  {
    id: "e1",
    title: "Lebanese Cultural Festival",
    culture: "Lebanese",
    kind: "Cultural",
    icon: PartyPopper,
    location: "Tumbalong Park, Darling Harbour",
    date: "Sat 6 Sep",
    time: "11:00 AM – 6:00 PM",
    organiser: "Sydney Lebanese Association",
    cost: "Free",
    interested: 34,
    description:
      "A full day of dabke performances, live music, arts and craft stalls, and food trucks celebrating Lebanese heritage in the heart of the city.",
  },
  {
    id: "e2",
    title: "Arabic Calligraphy Workshop",
    culture: "Lebanese",
    kind: "Cultural",
    icon: BookOpen,
    location: "Marrickville Community Centre",
    date: "Sun 7 Sep",
    time: "2:00 PM – 4:00 PM",
    organiser: "Ink & Ayn Collective",
    cost: "$15",
    interested: 9,
    description:
      "A beginner-friendly session on the fundamentals of Arabic calligraphy, materials included. No prior experience necessary.",
  },
  {
    id: "e3",
    title: "Pakistani Cultural Night",
    culture: "Pakistani",
    kind: "Cultural",
    icon: PartyPopper,
    location: "UNSW Roundhouse",
    date: "Fri 12 Sep",
    time: "6:30 PM – 10:00 PM",
    organiser: "South Asian Student Society",
    cost: "$10",
    interested: 61,
    description:
      "An evening of live qawwali, a catwalk in traditional dress, and a community dinner. Open to all students and their friends.",
  },
  {
    id: "e4",
    title: "Community Dinner: New to Sydney",
    culture: "Pakistani",
    kind: "Social",
    icon: Users,
    location: "Lakemba Community Hall",
    date: "Wed 10 Sep",
    time: "7:00 PM – 9:00 PM",
    organiser: "Newcomers Sydney",
    cost: "Free",
    interested: 22,
    description:
      "A relaxed shared dinner for people who've recently moved to Sydney and want to meet others from South Asian backgrounds.",
  },
  {
    id: "e5",
    title: "Korean Language Meetup",
    culture: "Korean",
    kind: "Social",
    icon: Users,
    location: "Eastwood Library",
    date: "Sat 13 Sep",
    time: "10:00 AM – 12:00 PM",
    organiser: "Hangeul Circle",
    cost: "Free",
    interested: 17,
    description:
      "Casual conversation practice for all levels, from complete beginners to fluent speakers looking to help others.",
  },
  {
    id: "e6",
    title: "Vietnamese Cooking Class: Phở from Scratch",
    culture: "Vietnamese",
    kind: "Cultural",
    icon: Utensils,
    location: "Cabramatta Community Kitchen",
    date: "Sun 14 Sep",
    time: "1:00 PM – 3:30 PM",
    organiser: "Bếp Nhà Community Kitchen",
    cost: "$25",
    interested: 28,
    description:
      "Learn to build a proper broth from bones and spices, then assemble your own bowl to take home the technique, not just the meal.",
  },
];

const PLACES = [
  {
    id: "p1",
    name: "Beit Beirut",
    cuisine: "Lebanese",
    type: "Restaurant",
    tag: "Halal",
    area: "Punchbowl",
    icon: Utensils,
  },
  {
    id: "p2",
    name: "Karachi Darbar",
    cuisine: "Pakistani",
    type: "Restaurant",
    tag: "Halal",
    area: "Lakemba",
    icon: Utensils,
  },
  {
    id: "p3",
    name: "Mama Roma Bakery",
    cuisine: "Italian",
    type: "Bakery",
    tag: "Vegetarian friendly",
    area: "Leichhardt",
    icon: Utensils,
  },
  {
    id: "p4",
    name: "Seoul Table",
    cuisine: "Korean",
    type: "Restaurant",
    tag: "Gluten-free options",
    area: "Strathfield",
    icon: Utensils,
  },
  {
    id: "p5",
    name: "An Nam Grocer",
    cuisine: "Vietnamese",
    type: "Grocery store",
    tag: "",
    area: "Cabramatta",
    icon: Building2,
  },
];

const COMMUNITIES = [
  { id: "c1", name: "South Asian Student Society", culture: "Pakistani", members: 412 },
  { id: "c2", name: "Sydney Lebanese Association", culture: "Lebanese", members: 890 },
  { id: "c3", name: "Hangeul Circle", culture: "Korean", members: 233 },
  { id: "c4", name: "Bếp Nhà Community Kitchen", culture: "Vietnamese", members: 156 },
];

const INITIAL_POSTS = [
  {
    id: "post1",
    author: "Amir H.",
    verified: true,
    time: "2h ago",
    text: "I'm new to Sydney and would love to meet other people interested in Pakistani culture! Any events coming up worth going to?",
    replies: 4,
    tag: null,
  },
  {
    id: "post2",
    author: "Layla K.",
    verified: true,
    time: "5h ago",
    text: "Is anyone going to the Lebanese Cultural Festival this Saturday? Looking for someone to go with!",
    replies: 6,
    tag: "Go Together",
    eventId: "e1",
  },
  {
    id: "post3",
    author: "Minjun P.",
    verified: false,
    time: "1d ago",
    text: "Does anyone know where I can learn basic conversational Korean before the language meetup?",
    replies: 2,
    tag: null,
  },
];

const NAV = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "community", label: "Community", icon: Users },
  { id: "world", label: "My World", icon: Boxes },
];

// SMALL SHARED BITS

function Chip({ active, onClick, children }) {
  return (
    <button className={"chip" + (active ? " chip--active" : "")} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function SectionEyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function EventCard({ event, saved, registered, interested, onToggleSave, onToggleGo, onOpen }) {
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
          onClick={() => onToggleGo(event.id)}
        >
          {registered ? <><Check size={13} /> Registered</> : "Register"}
        </button>
      </div>
    </article>
  );
}

// SCREENS

function HomeScreen({
  selectedCultures,
  toggleCulture,
  events,
  places,
  savedEvents,
  registeredEvents,
  toggleSave,
  toggleRegister,
  goTogether,
  toggleGoTogether,
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
        <h1>Find your people.<br />Discover your culture.<br />Build your world.</h1>
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
              interested={goTogether.has(e.id)}
              onToggleSave={toggleSave}
              onToggleGo={toggleRegister}
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

function PlaceRow({ place }) {
  const Icon = place.icon;
  return (
    <div className="brick-card place-row">
      <div className="event-card__icon event-card__icon--teal">
        <Icon size={17} strokeWidth={2} />
      </div>
      <div className="event-card__body">
        <h3 className="place-row__name">{place.name}</h3>
        <div className="meta-row">
          <MapPin size={13} /> <span>{place.area} · {place.type}</span>
        </div>
      </div>
      {place.tag && <span className="tag-soft">{place.tag}</span>}
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}

function ExploreScreen({ places, events, communities, savedPlaces, toggleSavePlace }) {
  const [category, setCategory] = useState("events");

  const categories = [
    { id: "events", label: "Events", icon: PartyPopper },
    { id: "food", label: "Food", icon: Utensils },
    { id: "community", label: "Community", icon: Building2 },
  ];

  return (
    <div className="screen">
      <div className="section">
        <SectionEyebrow>Explore</SectionEyebrow>
        <h1 className="screen-title">Cultural blocks around you</h1>
      </div>

      <div className="map-frame">
        <div className="map-frame__grid" />
        {[
          { top: "22%", left: "30%", label: "🎉" },
          { top: "48%", left: "62%", label: "🍜" },
          { top: "68%", left: "40%", label: "🏛" },
          { top: "35%", left: "78%", label: "📚" },
          { top: "58%", left: "18%", label: "🎉" },
        ].map((pin, i) => (
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
          {categories.map((c) => (
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

function EventsScreen({
  events,
  savedEvents,
  registeredEvents,
  goTogether,
  toggleSave,
  toggleRegister,
  toggleGoTogether,
  openEvent,
}) {
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
          {[
            ["browse", "Browse"],
            ["saved", "⭐ Saved"],
            ["registered", "✅ Registered"],
          ].map(([id, label]) => (
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
            interested={goTogether.has(e.id)}
            onToggleSave={toggleSave}
            onToggleGo={toggleRegister}
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

function EventDetail({ event, saved, registered, interested, goTogetherCount, onToggleSave, onToggleRegister, onToggleGoTogether, onClose }) {
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
        <span className="tag-mono">{event.culture} · {event.kind}</span>
        <h2>{event.title}</h2>
        <div className="meta-row"><MapPin size={14} /> {event.location}</div>
        <div className="meta-row"><Clock size={14} /> {event.date} · {event.time}</div>
        <div className="meta-row"><Users size={14} /> Organised by {event.organiser}</div>
        <div className="meta-row"><DollarSign size={14} /> {event.cost}</div>

        <p className="modal__desc">{event.description}</p>

        <div className="modal__actions">
          <button className={"icon-btn icon-btn--bordered" + (saved ? " icon-btn--gold" : "")} onClick={() => onToggleSave(event.id)}>
            <Star size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
          </button>
          <button className={"pill-btn" + (registered ? " pill-btn--done" : "")} onClick={() => onToggleRegister(event.id)}>
            {registered ? <><Check size={14} /> Registered</> : "Register"}
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
          <button className={"pill-btn pill-btn--outline" + (interested ? " pill-btn--done" : "")} onClick={() => onToggleGoTogether(event.id)}>
            {interested ? "You're interested in going together" : "I'm interested in going with others"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CommunityScreen({ posts, addPost, verified, communities }) {
  const [text, setText] = useState("");
  const [asGoTogether, setAsGoTogether] = useState(false);

  function submit() {
    if (!text.trim()) return;
    addPost(text.trim(), asGoTogether);
    setText("");
    setAsGoTogether(false);
  }

  return (
    <div className="screen">
      <div className="section">
        <SectionEyebrow>Community</SectionEyebrow>
        <h1 className="screen-title">We want connection —<br />connection has to be safe.</h1>
        <p className="hero__sub">
          {verified ? "Your account is verified. " : "Verify your account in My World to post and reply. "}
          All posts are moderated and can be reported.
        </p>
      </div>

      <div className="section">
        <div className="composer brick-card">
          <textarea
            placeholder={verified ? "Ask something, or find someone to go with…" : "Verify your account to start posting"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!verified}
            rows={2}
          />
          <div className="composer__row">
            <Chip active={asGoTogether} onClick={() => setAsGoTogether((v) => !v)}>
              <UserPlus size={13} style={{ marginRight: 4, verticalAlign: -2 }} />
              Go Together
            </Chip>
            <button className="pill-btn" disabled={!verified || !text.trim()} onClick={submit}>
              <Send size={13} /> Post
            </button>
          </div>
        </div>
      </div>

      <div className="section stack">
        {posts.map((p) => (
          <article className="brick-card post-card" key={p.id}>
            <div className="post-card__head">
              <div className="post-card__author">
                <span>{p.author}</span>
                {p.verified && (
                  <span className="verified-badge" title="Verified member">
                    <ShieldCheck size={13} /> Verified
                  </span>
                )}
              </div>
              <span className="post-card__time">{p.time}</span>
            </div>
            <p className="post-card__text">{p.text}</p>
            {p.tag && <span className="tag-soft tag-soft--gold">🤝 {p.tag}</span>}
            <div className="post-card__foot">
              <button className="text-btn"><MessageCircle size={14} /> {p.replies} replies</button>
              <div className="post-card__mod">
                <button className="text-btn text-btn--muted" title="Report post"><Flag size={13} /></button>
                <button className="text-btn text-btn--muted" title="Block user"><UserX size={13} /></button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="section">
        <SectionEyebrow>Societies &amp; communities</SectionEyebrow>
        <div className="stack">
          {communities.map((c) => (
            <div className="brick-card place-row" key={c.id}>
              <div className="event-card__icon event-card__icon--teal">
                <Building2 size={17} />
              </div>
              <div className="event-card__body">
                <h3 className="place-row__name">{c.name}</h3>
                <div className="meta-row"><Users size={13} /> {c.members} members</div>
              </div>
              <button className="pill-btn pill-btn--outline">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// My World: brick wall + profile + saved/registered journey

function BlockWall({ blocks }) {
  const rows = [];
  const perRow = 4;
  for (let i = 0; i < Math.max(blocks.length, perRow * 2); i += perRow) {
    rows.push(blocks.slice(i, i + perRow));
  }
  return (
    <div className="wall">
      {rows.map((row, ri) => (
        <div className={"wall__row" + (ri % 2 === 1 ? " wall__row--offset" : "")} key={ri}>
          {Array.from({ length: perRow }).map((_, ci) => {
            const b = row[ci];
            return (
              <div className={"brick" + (b ? " brick--filled" : " brick--empty")} key={ci} title={b ? b.label : "Not discovered yet"}>
                {b ? <b.icon size={14} /> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function WorldScreen({
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
    events
      .filter((e) => registeredEvents.has(e.id))
      .forEach((e) => b.push({ label: e.title, icon: PartyPopper }));
    places
      .filter((p) => savedPlaces.has(p.id))
      .forEach((p) => b.push({ label: p.name, icon: Utensils }));
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
            <div className="meta-row"><MapPin size={13} /> Sydney</div>
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
              <div className="event-card__icon"><e.icon size={16} /></div>
              <div className="event-card__body">
                <h3 className="place-row__name">{e.title}</h3>
                <div className="meta-row"><CalendarDays size={13} /> {e.date} · {e.time}</div>
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
              <div className="event-card__icon"><Star size={16} /></div>
              <div className="event-card__body">
                <h3 className="place-row__name">{e.title}</h3>
                <div className="meta-row"><MapPin size={13} /> {e.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ROOT APP

export default function BlockApp() {
  const [tab, setTab] = useState("home");
  const [selectedCultures, setSelectedCultures] = useState(["Lebanese", "Pakistani"]);
  const [savedEvents, setSavedEvents] = useState(new Set(["e1"]));
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [goTogether, setGoTogether] = useState(new Set(["e1"]));
  const [savedPlaces, setSavedPlaces] = useState(new Set(["p1"]));
  const [joinedCommunities] = useState(new Set(["c1"]));
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [verified, setVerified] = useState(false);
  const [detailEvent, setDetailEvent] = useState(null);

  function toggleCulture(name) {
    setSelectedCultures((cur) => (cur.includes(name) ? cur.filter((c) => c !== name) : [...cur, name]));
  }
  function toggleSet(setter) {
    return (id) =>
      setter((cur) => {
        const next = new Set(cur);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
  }
  const toggleSave = toggleSet(setSavedEvents);
  const toggleRegister = toggleSet(setRegisteredEvents);
  const toggleGoTogether = toggleSet(setGoTogether);
  const toggleSavePlace = toggleSet(setSavedPlaces);

  function addPost(text, asGoTogether) {
    setPosts((cur) => [
      { id: "post" + Date.now(), author: "You", verified: true, time: "just now", text, replies: 0, tag: asGoTogether ? "Go Together" : null },
      ...cur,
    ]);
  }

  const openEvent = (e) => setDetailEvent(e);

  return (
    <div className="app-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500&display=swap');

        :root{
          --brick:#C1502E;
          --brick-dark:#8C3A22;
          --ink:#221E1B;
          --parchment:#F6EFE3;
          --parchment-2:#EFE6D4;
          --teal:#1F3A3D;
          --gold:#C99A2E;
          --mortar:#DDD1B8;
          --card:#FFFDF8;
        }
        *{ box-sizing:border-box; }
        .app-shell{
          font-family:'Manrope', sans-serif;
          color:var(--ink);
          display:flex;
          justify-content:center;
          background:var(--parchment-2);
          padding:24px 12px;
          min-height:100vh;
        }
        .phone{
          width:100%;
          max-width:420px;
          background:var(--parchment);
          border-radius:28px;
          box-shadow:0 30px 60px -20px rgba(34,30,27,0.35), 0 0 0 8px #fff, 0 0 0 9px var(--mortar);
          overflow:hidden;
          position:relative;
          display:flex;
          flex-direction:column;
          min-height:780px;
        }
        .screen{
          flex:1;
          overflow-y:auto;
          padding:22px 18px 100px;
        }
        .screen::-webkit-scrollbar{ display:none; }

        h1, h2, h3{ font-family:'Fraunces', serif; font-weight:600; letter-spacing:-0.01em; margin:0 0 4px; color:var(--ink); }
        .hero h1{ font-size:1.7rem; line-height:1.18; margin-top:6px; }
        .screen-title{ font-size:1.4rem; line-height:1.2; margin-top:4px; }
        .hero__sub{ color:#5b5450; font-size:0.9rem; line-height:1.5; margin-top:10px; max-width:34ch; }

        .eyebrow{
          font-family:'IBM Plex Mono', monospace;
          font-size:0.68rem;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:var(--brick-dark);
          font-weight:500;
        }

        .section{ margin-top:26px; }
        .section:first-child{ margin-top:4px; }
        .section__head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }

        .stack{ display:flex; flex-direction:column; gap:10px; margin-top:12px; }

        .chip-row{ display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
        .chip{
          font-family:'Manrope', sans-serif;
          font-size:0.8rem;
          font-weight:600;
          padding:7px 13px;
          border-radius:999px;
          border:1.5px solid var(--mortar);
          background:var(--card);
          color:var(--ink);
          cursor:pointer;
          transition:all .15s ease;
        }
        .chip--active{ background:var(--brick); border-color:var(--brick); color:#fff; }

        .brick-card{
          background:var(--card);
          border:1px solid var(--mortar);
          border-radius:14px;
          padding:14px;
          display:flex;
          gap:12px;
          align-items:flex-start;
          cursor:default;
          box-shadow:0 1px 0 rgba(34,30,27,0.02);
        }
        .event-card{ cursor:pointer; }
        .event-card__icon{
          width:36px; height:36px; flex:none; border-radius:10px;
          background:linear-gradient(160deg, var(--brick), var(--brick-dark));
          color:#fff; display:flex; align-items:center; justify-content:center;
        }
        .event-card__icon--teal{ background:linear-gradient(160deg, #2c5559, var(--teal)); }
        .event-card__body{ flex:1; min-width:0; }
        .event-card__body h3{ font-size:0.98rem; margin:2px 0 6px; }
        .event-card__top{ display:flex; gap:6px; margin-bottom:2px; }
        .place-row__name{ font-size:0.95rem; margin:0 0 4px; }

        .tag-mono{
          font-family:'IBM Plex Mono', monospace;
          font-size:0.62rem; letter-spacing:0.05em; text-transform:uppercase;
          background:var(--parchment-2); color:var(--brick-dark);
          padding:3px 7px; border-radius:6px; white-space:nowrap;
        }
        .tag-mono--muted{ color:#7a726b; }
        .tag-soft{
          display:inline-block; font-size:0.72rem; font-weight:600;
          background:#EDEAE0; color:#5b5450; padding:4px 9px; border-radius:8px; margin-top:6px;
        }
        .tag-soft--gold{ background:#FBF0D6; color:#8a6a11; }

        .meta-row{ display:flex; align-items:center; gap:6px; font-size:0.78rem; color:#6b635d; margin-top:3px; }

        .event-card__actions{ display:flex; flex-direction:column; align-items:flex-end; gap:8px; flex:none; }
        .icon-btn{
          width:30px; height:30px; border-radius:9px; border:1px solid var(--mortar);
          background:var(--card); color:#8a8078; display:flex; align-items:center; justify-content:center; cursor:pointer;
        }
        .icon-btn--gold{ color:var(--gold); border-color:var(--gold); background:#FBF0D6; }
        .icon-btn--bordered{ width:auto; padding:0 12px; gap:6px; font-size:0.82rem; font-weight:600; }

        .pill-btn{
          font-family:'Manrope', sans-serif; font-size:0.78rem; font-weight:700;
          border:none; border-radius:999px; padding:8px 14px;
          background:var(--brick); color:#fff; cursor:pointer;
          display:inline-flex; align-items:center; gap:5px; white-space:nowrap;
        }
        .pill-btn--done{ background:#2e6b3e; }
        .pill-btn--outline{ background:transparent; border:1.5px solid var(--brick); color:var(--brick); }
        .pill-btn--outline.pill-btn--done{ border-color:#2e6b3e; color:#2e6b3e; }
        .pill-btn:disabled{ opacity:0.45; cursor:not-allowed; }

        .link-btn{
          border:none; background:none; color:var(--brick-dark); font-weight:700; font-size:0.78rem;
          display:flex; align-items:center; gap:2px; cursor:pointer; font-family:'Manrope', sans-serif;
        }

        .empty-state{
          border:1.5px dashed var(--mortar); border-radius:14px; padding:20px; text-align:center;
          color:#8a8078; font-size:0.85rem;
        }

        .map-frame{
          margin-top:16px; position:relative; height:190px; border-radius:16px; overflow:hidden;
          background:
            linear-gradient(160deg, #2c5559, var(--teal));
          border:1px solid var(--mortar);
        }
        .map-frame__grid{
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size:26px 26px;
        }
        .map-pin{
          position:absolute; transform:translate(-50%,-50%);
          width:30px; height:30px; border-radius:50%; background:#fff;
          display:flex; align-items:center; justify-content:center; font-size:14px;
          box-shadow:0 4px 10px rgba(0,0,0,0.35);
        }
        .map-frame__caption{
          position:absolute; left:10px; bottom:10px; right:10px;
          background:rgba(34,30,27,0.55); backdrop-filter:blur(2px);
          color:#fff; font-size:0.72rem; padding:6px 10px; border-radius:9px;
          display:flex; align-items:center; gap:6px;
        }

        .tab-row{ display:flex; gap:4px; background:var(--parchment-2); padding:4px; border-radius:12px; }
        .tab-btn{
          flex:1; border:none; background:none; padding:8px 6px; font-size:0.78rem; font-weight:700;
          border-radius:9px; cursor:pointer; color:#6b635d; font-family:'Manrope', sans-serif;
        }
        .tab-btn--active{ background:#fff; color:var(--ink); box-shadow:0 1px 3px rgba(0,0,0,0.08); }

        .composer textarea{
          width:100%; border:none; resize:none; font-family:'Manrope', sans-serif; font-size:0.88rem;
          background:transparent; outline:none; color:var(--ink);
        }
        .composer{ flex-direction:column; align-items:stretch; }
        .composer__row{ display:flex; align-items:center; justify-content:space-between; margin-top:8px; }

        .post-card{ flex-direction:column; align-items:stretch; }
        .post-card__head{ display:flex; align-items:center; justify-content:space-between; }
        .post-card__author{ display:flex; align-items:center; gap:8px; font-weight:700; font-size:0.88rem; }
        .post-card__time{ font-size:0.72rem; color:#948b83; }
        .post-card__text{ font-size:0.86rem; line-height:1.5; margin:8px 0 2px; color:#3a3532; }
        .post-card__foot{ display:flex; align-items:center; justify-content:space-between; margin-top:10px; }
        .post-card__mod{ display:flex; gap:6px; }
        .verified-badge{
          display:inline-flex; align-items:center; gap:4px; font-size:0.68rem; font-weight:700;
          color:#2e6b3e; background:#E4F0E3; padding:3px 8px; border-radius:999px;
        }
        .text-btn{
          border:none; background:none; font-family:'Manrope', sans-serif; font-weight:700; font-size:0.76rem;
          color:var(--brick-dark); display:inline-flex; align-items:center; gap:5px; cursor:pointer; padding:0;
        }
        .text-btn--muted{ color:#a49a91; }

        .modal-backdrop{
          position:absolute; inset:0; background:rgba(34,30,27,0.5);
          display:flex; align-items:flex-end; z-index:20;
        }
        .modal{
          background:var(--parchment); width:100%; max-height:88%; overflow-y:auto;
          border-radius:22px 22px 0 0; padding:22px 20px 30px; position:relative;
        }
        .modal__close{
          position:absolute; top:14px; right:14px; border:none; background:var(--parchment-2);
          width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;
        }
        .modal__icon{
          width:44px; height:44px; border-radius:12px; margin-bottom:10px;
          background:linear-gradient(160deg, var(--brick), var(--brick-dark)); color:#fff;
          display:flex; align-items:center; justify-content:center;
        }
        .modal h2{ font-size:1.3rem; margin:6px 0 10px; }
        .modal__desc{ font-size:0.86rem; line-height:1.55; color:#4a4440; margin:14px 0; }
        .modal__actions{ display:flex; gap:10px; margin:14px 0 18px; }
        .go-together{ background:var(--card); border:1px solid var(--mortar); border-radius:14px; padding:14px; }
        .go-together__head{ display:flex; gap:10px; align-items:flex-start; }
        .go-together__head strong{ font-size:0.86rem; }
        .go-together__head p{ font-size:0.78rem; color:#6b635d; margin:3px 0 10px; }
        .go-together .pill-btn{ width:100%; justify-content:center; }

        .profile-card{ align-items:center; }
        .profile-card__avatar{
          width:52px; height:52px; border-radius:50%; flex:none;
          background:linear-gradient(160deg, var(--gold), var(--brick-dark));
          color:#fff; display:flex; align-items:center; justify-content:center;
          font-family:'Fraunces', serif; font-size:1.3rem; font-weight:600;
        }

        .wall{ margin-top:14px; display:flex; flex-direction:column-reverse; gap:6px; }
        .wall__row{ display:flex; gap:6px; }
        .wall__row--offset{ margin-left:18px; margin-right:-18px; }
        .brick{
          flex:1; height:34px; border-radius:6px; display:flex; align-items:center; justify-content:center;
        }
        .brick--filled{
          background:linear-gradient(160deg, var(--brick), var(--brick-dark)); color:#fff;
          box-shadow:inset 0 -3px 0 rgba(0,0,0,0.15);
        }
        .brick--empty{ background:var(--parchment-2); border:1.5px dashed var(--mortar); }
        .wall__caption{ font-size:0.8rem; color:#6b635d; margin-top:10px; line-height:1.5; }
        .check-icon{ color:#2e6b3e; flex:none; }

        .bottom-nav{
          position:absolute; bottom:0; left:0; right:0;
          background:#fff; border-top:1px solid var(--mortar);
          display:flex; padding:8px 6px 14px;
        }
        .nav-btn{
          flex:1; border:none; background:none; display:flex; flex-direction:column; align-items:center; gap:3px;
          padding:6px 2px; cursor:pointer; color:#a49a91; font-family:'Manrope', sans-serif;
        }
        .nav-btn span{ font-size:0.64rem; font-weight:700; }
        .nav-btn--active{ color:var(--brick); }
      `}</style>

      <div className="phone">
        {tab === "home" && (
          <HomeScreen
            selectedCultures={selectedCultures}
            toggleCulture={toggleCulture}
            events={EVENTS}
            places={PLACES}
            savedEvents={savedEvents}
            registeredEvents={registeredEvents}
            toggleSave={toggleSave}
            toggleRegister={toggleRegister}
            goTogether={goTogether}
            toggleGoTogether={toggleGoTogether}
            openEvent={openEvent}
            goTo={setTab}
          />
        )}
        {tab === "explore" && (
          <ExploreScreen places={PLACES} events={EVENTS} communities={COMMUNITIES} savedPlaces={savedPlaces} toggleSavePlace={toggleSavePlace} />
        )}
        {tab === "events" && (
          <EventsScreen
            events={EVENTS}
            savedEvents={savedEvents}
            registeredEvents={registeredEvents}
            goTogether={goTogether}
            toggleSave={toggleSave}
            toggleRegister={toggleRegister}
            toggleGoTogether={toggleGoTogether}
            openEvent={openEvent}
          />
        )}
        {tab === "community" && <CommunityScreen posts={posts} addPost={addPost} verified={verified} communities={COMMUNITIES} />}
        {tab === "world" && (
          <WorldScreen
            selectedCultures={selectedCultures}
            registeredEvents={registeredEvents}
            savedEvents={savedEvents}
            savedPlaces={savedPlaces}
            joinedCommunities={joinedCommunities}
            events={EVENTS}
            places={PLACES}
            verified={verified}
            setVerified={setVerified}
          />
        )}

        {detailEvent && (
          <EventDetail
            event={detailEvent}
            saved={savedEvents.has(detailEvent.id)}
            registered={registeredEvents.has(detailEvent.id)}
            interested={goTogether.has(detailEvent.id)}
            goTogetherCount={detailEvent.interested}
            onToggleSave={toggleSave}
            onToggleRegister={toggleRegister}
            onToggleGoTogether={toggleGoTogether}
            onClose={() => setDetailEvent(null)}
          />
        )}

        <nav className="bottom-nav">
          {NAV.map((n) => (
            <button key={n.id} className={"nav-btn" + (tab === n.id ? " nav-btn--active" : "")} onClick={() => setTab(n.id)}>
              <n.icon size={19} strokeWidth={tab === n.id ? 2.4 : 2} />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
