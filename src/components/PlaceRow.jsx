import React from "react";
import { MapPin } from "lucide-react";

export default function PlaceRow({ place }) {
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
