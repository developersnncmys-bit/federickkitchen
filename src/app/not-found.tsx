import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow text-gold/70">404</span>
      <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-cream">
        That road doesn&rsquo;t go anywhere.
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-cream-dim">
        The page you were looking for isn&rsquo;t here. The coffee, however, still is.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
        >
          Back to the estate
        </Link>
        <Link
          href="/book"
          className="rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream transition-colors hover:border-gold/50 hover:text-gold"
        >
          Book a room
        </Link>
      </div>
    </div>
  );
}
