import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_UPDATED } from "@/lib/legal";

// Copied from the Kinwoo app (apps/web/src/components/legal/LegalDocument.tsx).
// The app's back button depends on its router helpers, so here it is a plain link home.
export function LegalDocument({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="px-6 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <Link
        href="/"
        aria-label="Back to home"
        className="focus-visible:outline-foreground -mx-2 flex size-9 items-center justify-start hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      </Link>
      <h1 className="font-display mt-6 text-2xl font-medium">{title}</h1>
      <p className="text-muted-foreground mt-2 text-sm">Last updated {LEGAL_UPDATED}</p>
      <p className="mt-6 text-sm leading-relaxed">{intro}</p>
      <div className="mt-10 flex flex-col gap-10">{children}</div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-lg font-medium">{title}</h2>
      {children}
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-sm leading-relaxed font-normal">{children}</p>;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = /^(https?:|mailto:)/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="text-foreground font-medium underline underline-offset-2"
    >
      {children}
    </a>
  );
}
