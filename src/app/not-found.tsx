import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="section-label">404</span>
      <h1>That page doesn’t exist.</h1>
      <p>
        The link may be out of date, or the project may have moved. Head back
        to the portfolio to keep exploring.
      </p>
      <div className="not-found-actions">
        <Link href="/" className="btn-primary">
          <ArrowLeft size={17} />
          Back to portfolio
        </Link>
        <Link href="/resume" className="btn-secondary">
          View resume
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
