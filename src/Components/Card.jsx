import React from "react";
import { useEffect, useState } from "react";

export default function Card({
  firstName,
  lastName,
  avatar,
  onDelete,
  onUpdate,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "16px",
          }}
        />
        <div>
          <h3 style={{ margin: 0 }}>{`${firstName} ${lastName}`}</h3>
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onUpdate}
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: "8px 12px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
