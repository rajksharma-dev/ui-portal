import { useState } from "react";
import React from "react";
import { sayHello } from "../helloApi";

export default function HelloPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const res = await sayHello(name);
    setMessage(res);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Hello Service</h2>

      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClick}>Send</button>

      <h3>{message}</h3>
    </div>
  );
}
