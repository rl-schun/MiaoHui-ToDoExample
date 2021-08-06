import React from "react";
import "./Card-Style.css";

function Card({ children }) {
  return <div className="container">{children}</div>;
}

export default Card;
