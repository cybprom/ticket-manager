"use client";
import Link from "next/link";
import React, { useState } from "react";

async function getTickets(page, limit = 10) {
  // imitate delay
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  // fetch("http://localhost:4000/tickets/"
  // "http://localhost:4000/tickets?_page=1&_limit=5"

  const response = await fetch(
    `http://localhost:4000/tickets?_page=${page}&_limit=${limit}`,
    {
      next: {
        revalidate: 0, // use 0 to opt out of using cache
      },
    }
  );

  return response.json();
}

export default async function TicketList() {
  // const [page, setPage] = useState(1);
  const tickets = await getTickets(1); // Change this hardcoded value
  //   const slicedTickets = tickets.slice(0, 5);
  // const length = tickets.length;

  // const next = (page) => {
  //   setPage(page + 1);
  //   console.log(page);
  // };
  // const prev = (page) => {
  //   if (page > 0) {
  //     setPage(page - 1);
  //   }
  //   console.log(page);
  // };

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, ticket.body.length / 2)} ...</p>
            <div className={`pill ${ticket.priority}`}>
              {" "}
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are currently no open tickets!</p>
      )}
      {/* Pagination */}
      <div className="flex justifyend justify-center items-center mb-20 mt-10 ">
        <div className="flex items-center gap4 lg:gap4 rounded-[40px] border[1px] border-black border-Neutra40 px2 py2">
          {/*   PREV Button */}
          {/* <button
            type="button"
            // onClick={() => prev(page)}
            // disabled={currentPage === 1}
            className=" font-Inter text-base lg:text-lg font-semibold hover:opacity-60 transition-opacity -ml-2"
          >
            Prev
          </button> */}

          {/*    NEXT Button */}
          {/* <button
            type="button"
            // onClick={() => next(page)}
            // disabled={currentPage === totalPages}
            className=" font-Inter lg:text-lg font-semibold hover:opacity-60 transition-opacity -mr-2"
          >
            Next
          </button> */}
          {/* <button className=" btn-primary" onClick={() => loadMore(page)}>
            Load more
          </button> */}
        </div>
      </div>
    </>
  );
}
