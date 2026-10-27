"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  /** `blur` fades up out of a blur; `pop` scales and spins in (set `--pop-spin` for the angle). */
  variant?: "blur" | "pop";
  /** Delay in ms after the element scrolls into view. */
  delay?: number;
  /**
   * Delay in ms used instead of `delay` when the element is already on screen at page load,
   * so it can wait for the on-load hero animation. Defaults to `delay`.
   */
  initialDelay?: number;
  /**
   * IntersectionObserver root margin. The default reveals slightly after the element enters the
   * viewport; content at the very bottom of the page can never get that far, so it should pass "0px".
   */
  rootMargin?: string;
};

/**
 * Animates its content in the first time it scrolls into view.
 * The visual states live in globals.css (`[data-reveal]`); this only flips an attribute.
 * For content visible on first paint, use the CSS-only `data-load-reveal` attribute instead.
 */
export function Reveal({
  variant = "blur",
  delay = 0,
  initialDelay = delay,
  rootMargin = "0px 0px -10% 0px",
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealedDelay, setRevealedDelay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The observer always reports once right after `observe`; that first report tells us
    // whether the element was already on screen when the page loaded.
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealedDelay(first ? initialDelay : delay);
          observer.disconnect();
        }
        first = false;
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, delay, initialDelay]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-revealed={revealedDelay === null ? undefined : ""}
      style={{ "--reveal-delay": `${revealedDelay ?? 0}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
