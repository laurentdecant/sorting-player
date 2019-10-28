import React from "react";

export default ({ values, highlights }) => {
  return (
    <div className="algorithm">
      <ul>
        {values.map((value, index) => (
          <li
            key={index}
            style={{ width: `${100 / values.length}%`, height: `${value}%` }}
            className={`${highlights.includes(index) ? "red" : ""}`}
          />
        ))}
      </ul>
    </div>
  );
};
