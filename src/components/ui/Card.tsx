import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  padding?: "default" | "compact" | "spacious";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Card({
  children,
  hoverable = true,
  padding = "default",
  className = "",
  style,
  onClick,
}: CardProps) {
  const classes = [
    styles.card,
    hoverable ? styles.hoverable : "",
    padding === "compact" ? styles.compact : padding === "spacious" ? styles.spacious : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
