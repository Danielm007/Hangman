import React from "react";

export const Button = ({ onClick, text }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};
