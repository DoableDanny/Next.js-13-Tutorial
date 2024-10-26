import Link from "next/link";

/**
 * We can scope 404 pages to different parts of the website. E.g., this 404 will render for an unfound ticket page and overrides the global 404 in the app dir.
 */
export default function NotFound() {
  return (
    <main className="text-center">
      <h2 class="text-3xl">We hit a brick wall</h2>
      <p>We could not find the ticket you were looking for.</p>
      <p>
        Go back to all <Link href="/tickets">tickets</Link>
      </p>
    </main>
  );
}
