import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="text-center mt-40">
      <h2 className="text-3xl">We Hit a Brick Wall.</h2>
      <p>We could not find the ticket you were looking for.</p>
      <p>
        Go back to all <Link href="/tickets">tickets</Link>.
      </p>
    </main>
  );
}