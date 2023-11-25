import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="gap-0">
      <div className="text-5xl text-primary font-serif">C</div>
      <h1 className="mr-5">ybprom Helpdesk</h1>
      <Link href="/" className="mr-5">
        Dashboard
      </Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
