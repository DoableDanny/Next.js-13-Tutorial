// /tickets/123 => 123 is usually known as route param (as opposed to query param ?id=123), but in nextjs when a folder name has [] it's known as a "dynamic segment" of a route. Normal route folders are known as "segments" of routes.

import { notFound } from "next/navigation";

export const dynamicParams = true; // Control what happens when a dynamic segment is visited that was not generated with generateStaticParams. true by default: Dynamic segments not included in generateStaticParams are generated on demand. False: Dynamic segments not included in generateStaticParams will return a 404.

// But the fetch in getTicket() will only cause pages to be cached AFTER a user has made a request to the page, as NextJS has no idea what ticket ids to make pages for at build time. So, in order for nextjs to create static pages at build time, we need to tell nextjs what ids to make static pages. We can do this by exporting a func called generateStaticParams() that returns an array of objects, with each object representing a single page/route that we want nextjs to make. But, if we have `revalidate: 0` then the pages created from generateStaticParams() become redundant, as we're saying we don't want to cache the pages at all. Also, if we delete a ticket from the db, then Next.js will try to delete the page too after the cache revalidation period.
export async function generateStaticParams() {
  const res = await fetch(`http://localhost:4000/tickets`);
  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id) {
  // Imitate delay so we can test the loading.jsx component
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60, // cache result for all users for 60 secs. This page can be redistributed to a CDN during each caching period for FAST response.
    },
  });

  if (!res.ok) {
    notFound(); // nextjs function to show 404 page
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  const id = params.id; // the dynamic route param (e.g. http://localhost:3000/tickets/123 --> id = 123 cus file route is tickets/[id])
  const ticket = await getTicket(id);
  console.log(ticket);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div class="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div class={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
      </div>
    </main>
  );
}
