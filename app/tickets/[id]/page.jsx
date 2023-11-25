"use client";
import React from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";

async function getDetails(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) return undefined;

  return res.json();
}

export default async function TicketDetails({ params }) {
  const router = useRouter();
  const id = params.id;
  const ticket = await getDetails(id);

  if (!ticket) {
    notFound();
  }

  // Function to DELETE Tickets
  const deleteTicket = async (id) => {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    });

    if (res.status === 200) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <main>
      <nav className="justify-between">
        <Link href={"/tickets"}> &larr; Go back</Link>
        <h2>Ticket Details</h2>
        <button className="btn-primary" onClick={() => deleteTicket(id)}>
          Delete Ticket
        </button>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
