import Link from "next/link";

/**
 * Create a file called not-found in the app dir for a custom 404 page
 */
export default function NotFound() {
  return (
    <main className="text-center">
      <h2 class="text-3xl">There was a problem</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the dashboard <Link href="/">Dashborad</Link>
      </p>
    </main>
  );
}
