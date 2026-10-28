import type { ReactNode } from "react";
import { LEGAL_UPDATED } from "@/lib/legal";

// Copied from the Kinwoo app (apps/web/src/components/legal/LegalDocument.tsx),
// without the app's back button.
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
      <h1 className="font-display text-2xl font-medium">{title}</h1>
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
