import React from "react";

export default ({ title, values, highlights }) => {
  return (
    <div className="visualizer">
      <h2>{title}</h2>
      <ul>
        {values.map((value, index) => (
          <li
            key={index}
            style={{
              background: `hsl(${value * (360 / values.length)}, 100%, ${
                highlights.includes(index) ? "100%" : "50%"
              })`,
              height: `${value * (100 / values.length)}%`,
              width: `${100 / values.length}%`
            }}
          />
        ))}
      </ul>
    </div>
  );
};
