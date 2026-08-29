import React from "react";

export default function BlockWall({ blocks }) {
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
