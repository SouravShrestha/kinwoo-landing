import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404: Page not found",
};

export default function NotFound() {
  return (
    <main className="font-display flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="flex w-full max-w-3xl flex-col items-center">
        <h1 className="text-7xl font-medium tracking-tight sm:text-8xl">404</h1>
        <h2 className="mt-10 text-xl font-medium">Page not found</h2>
        <p className="text-muted-foreground mt-6 text-base leading-snug font-medium sm:text-xl md:whitespace-nowrap">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved
        </p>
        <Link
          href="/"
          className="bg-foreground text-background focus-visible:outline-foreground mt-12 flex h-14 w-full max-w-sm items-center justify-center rounded-2xl text-lg font-medium transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
