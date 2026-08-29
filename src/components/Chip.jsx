import React from "react";

export default function Chip({ active, onClick, children }) {
  return (
    <button className={"chip" + (active ? " chip--active" : "")} onClick={onClick} type="button">
      {children}
    </button>
  );
}
