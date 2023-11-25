"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitile] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority,
      user_email: "promise@cybprom.dev",
    };

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label htmlFor="title">
        <span>Title:</span>
        <input
          id="title"
          required
          type="text"
          onChange={(e) => setTitile(e.target.value)}
          value={title}
        />
      </label>
      <label htmlFor="body">
        <span>Body:</span>
        <textarea
          id="body"
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label htmlFor="priority">
        <span>Priority:</span>{" "}
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && (
          <span>
            Adding<span className="animate-pulse"> ...</span>
          </span>
        )}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
