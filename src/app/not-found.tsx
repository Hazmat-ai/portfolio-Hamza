import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wrap project-page">
      <p>404</p>
      <h1>That page doesn’t exist.</h1>
      <p>
        The link may be out of date. Return to the portfolio to explore the
        work.
      </p>
      <p>
        <Link className="btn" href="/">
          Back to portfolio
        </Link>
      </p>
    </main>
  );
}
