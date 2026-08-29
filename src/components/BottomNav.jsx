import React from "react";
import { NAV } from "../data/mockData";

export default function BottomNav({ tab, setTab }) {
  return (
    <nav className="bottom-nav">
      {NAV.map((n) => (
        <button key={n.id} className={"nav-btn" + (tab === n.id ? " nav-btn--active" : "")} onClick={() => setTab(n.id)}>
          <n.icon size={19} strokeWidth={tab === n.id ? 2.4 : 2} />
          <span>{n.label}</span>
        </button>
      ))}
    </nav>
  );
}
