import React, { useState } from "react";
import "./styles.css";

import { EVENTS, PLACES, COMMUNITIES, INITIAL_POSTS } from "./data/mockData";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import EventsScreen from "./screens/EventsScreen";
import CommunityScreen from "./screens/CommunityScreen";
import WorldScreen from "./screens/WorldScreen";
import EventDetail from "./components/EventDetail";
import BottomNav from "./components/BottomNav";

export default function App() {
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
      {
        id: "post" + Date.now(),
        author: "You",
        verified: true,
        time: "just now",
        text,
        replies: 0,
        tag: asGoTogether ? "Go Together" : null,
      },
      ...cur,
    ]);
  }

  const openEvent = (e) => setDetailEvent(e);

  return (
    <div className="app-shell">
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
            openEvent={openEvent}
            goTo={setTab}
          />
        )}

        {tab === "explore" && (
          <ExploreScreen
            places={PLACES}
            events={EVENTS}
            communities={COMMUNITIES}
            savedPlaces={savedPlaces}
            toggleSavePlace={toggleSavePlace}
          />
        )}

        {tab === "events" && (
          <EventsScreen
            events={EVENTS}
            savedEvents={savedEvents}
            registeredEvents={registeredEvents}
            toggleSave={toggleSave}
            toggleRegister={toggleRegister}
            openEvent={openEvent}
          />
        )}

        {tab === "community" && (
          <CommunityScreen posts={posts} addPost={addPost} verified={verified} communities={COMMUNITIES} />
        )}

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

        <BottomNav tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}