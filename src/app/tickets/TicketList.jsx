import Link from "next/link";

async function getTickets() {
  // Imitate delay so we can test the loading.jsx component
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Next13 magic: if we make this same fetch elsewhere, it will memoize the result and reuse it, so it only makes this fetch once. Also, if the user navigates away from this page, it will reuse the cached fetch -- great for speed and UX for data that doesn't change much like ecommmerce and blogs.
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, //  e.g. if value is 30 (not 0, as here) cache for 30 seconds. After 30 secs, next will refetch the data in the background and the next request to the page will use the new cached data. Use 0 to opt out of caching. This tells Next.js to cache the result of the fetch for 30 seconds, meaning the response will be shared among all users during that time period. After 30 seconds, Next.js will refetch the data in the background and update the cache, but until then, all users will receive the cached data.
      // Memoization Behavior: In Next.js 13, with this setup, if the same fetch request is made elsewhere (or if the user navigates back to this page), Next.js will memoize the result and reuse the cached data, which is again global for all users. This is great for performance because it prevents repeated requests to the backend, and the same data can be served quickly.
      // Server-Side Component: Since this is a Server Component by default in Next.js 13, the data fetching happens on the server. The server handles caching globally unless you specifically configure it otherwise. In this case, you’re using a cache that is valid for 30 seconds, meaning all users will get the same cached tickets data for that duration, and the server won’t make a new request for each user.
    },
  });
  return res.json();
}

/**
 * By default, in next13, this is a Server Component. When using Server comps, we can make declare them async, and use the fetch api directly inside them.
 */
export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} id={ticket.key} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}

      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
