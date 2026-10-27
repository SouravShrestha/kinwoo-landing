"use client";

import Image from "next/image";
import groceries from "@/assets/main-ss-iphone.png";
import home from "@/assets/main-ss-iphone-1.png";
import settleUp from "@/assets/main-ss-iphone-2.png";
import bought from "@/assets/main-ss-iphone-3.png";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";

// How long each screen stays up before moving to the next one.
const HOLD_MS = 6000;

// All screenshots share the same canvas and phone frame position, so they stack exactly.
const SCREENS = [
  {
    src: groceries,
    alt: "Kinwoo groceries screen with pending items selected and ready to assign to a housemate",
  },
  {
    src: home,
    alt: "Kinwoo home screen showing what you're owed across shared bills, quick actions, and today's essentials",
  },
  {
    src: settleUp,
    alt: "Kinwoo settle-up screen recording a ₹729.17 payment from Priya Menon",
  },
  {
    src: bought,
    alt: "Kinwoo bought items sheet showing three groceries closed by Mohan Gowda for ₹900",
  },
];

/**
 * The hero phone, cycling through app screens with a blurred crossfade.
 * The first screen is in the normal flow and sets the size; the others are stacked on top of it.
 * Cycling pauses while the phone is off screen or the tab is hidden, and is off entirely for
 * people who prefer reduced motion. The transition styles live in globals.css (`[data-screen]`).
 */
export function PhoneScreens({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setRunning(visible && !document.hidden && !reducedMotion.matches);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SCREENS.length), HOLD_MS);
    return () => clearTimeout(id);
  }, [running, active]);

  return (
    // `isolate` keeps the active screen's z-index from lifting it above the dissolve and stickers.
    <div ref={ref} className={`isolate ${className}`} {...rest}>
      {SCREENS.map(({ src, alt }, i) => (
        <Image
          key={src.src}
          src={src}
          alt={alt}
          // Only the first screen is needed for first paint.
          priority={i === 0}
          sizes="1232px"
          data-screen
          data-active={active === i ? "" : undefined}
          aria-hidden={active !== i}
          className={`h-auto w-full ${i === 0 ? "relative" : "absolute inset-0"}`}
        />
      ))}
    </div>
  );
}
