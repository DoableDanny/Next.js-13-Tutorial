"use client"; // makes this a client component

import { useRouter } from "next/navigation";
import { useState } from "react";

// Both client components and server comps are rendered on the server, BUT client comps also require hydration in the browser to make them interactive (e.g. manage local  state, attach onClick listeners etc.). So, if we need state or interactivity ("react stuff" like useState, useEffect, etc), then we need to use Client Comp as it needs hydration in the browser.
export default function CreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticketData = {
      title,
      body,
      priority,
      user_email: "mario@netninja.dev", // we have no auth setup at moment, so hard code email
    };

    const res = await fetch(`http://localhost:4000/tickets`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    if (res.status === 201) {
      router.push("/tickets");
      router.refresh(); // refresh data so that the new ticket will show up at /tickets
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <label>
        <span>Title: </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Body: </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Priority: </span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="low">High</option>
        </select>
      </label>
      <button class="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
