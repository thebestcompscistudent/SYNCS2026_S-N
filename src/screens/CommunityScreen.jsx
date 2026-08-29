import React, { useState } from "react";
import { ShieldCheck, MessageCircle, Flag, UserX, UserPlus, Send, Building2, Users } from "lucide-react";
import SectionEyebrow from "../components/SectionEyebrow";
import Chip from "../components/Chip";

export default function CommunityScreen({ posts, addPost, verified, communities }) {
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
        <h1 className="screen-title">
          We want connection —
          <br />
          connection has to be safe.
        </h1>
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
              <button className="text-btn">
                <MessageCircle size={14} /> {p.replies} replies
              </button>
              <div className="post-card__mod">
                <button className="text-btn text-btn--muted" title="Report post">
                  <Flag size={13} />
                </button>
                <button className="text-btn text-btn--muted" title="Block user">
                  <UserX size={13} />
                </button>
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
                <div className="meta-row">
                  <Users size={13} /> {c.members} members
                </div>
              </div>
              <button className="pill-btn pill-btn--outline">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
