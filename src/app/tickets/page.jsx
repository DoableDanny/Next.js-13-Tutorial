import React, { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
      </nav>

      {/* The above nav section doesn't need to be loaded, so rather than making the user wait to see it, we can create a Suspense boundary around TicketList, so the rest of the content can be shown in the browser instantly. Then after the data has been fetched, the ticketlist will be rendered. */}
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
