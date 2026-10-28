import Image, { type StaticImageData } from "next/image";
import wordmark from "@/assets/logo-typed-white.png";
import playStore from "@/assets/play-store.svg";
import sticker01 from "@/assets/sticker_01.png";
import sticker02 from "@/assets/sticker_02.png";
import sticker03 from "@/assets/sticker_03.png";
import sticker04 from "@/assets/sticker_04.png";
import sticker05 from "@/assets/sticker_05.png";
import sticker06 from "@/assets/sticker_06.png";
import sticker07 from "@/assets/sticker_07.png";
import sticker08 from "@/assets/sticker_08.png";
import sticker09 from "@/assets/sticker_09.png";
import sticker10 from "@/assets/sticker_10.png";
import sticker13 from "@/assets/sticker_13.png";
import sticker14 from "@/assets/sticker_14.png";
import sticker15 from "@/assets/sticker_15.png";
import sticker16 from "@/assets/sticker_16.png";
import sticker18 from "@/assets/sticker_18.png";
import webIcon from "@/assets/web-icon.svg";
import { PhoneScreens } from "@/components/PhoneScreens";
import { Reveal } from "@/components/Reveal";
import { TestingProgramForm } from "@/components/TestingProgramForm";
import { LEGAL_LABELS, LEGAL_PATHS } from "@/lib/legal";
import Link from "next/link";
import type { CSSProperties } from "react";

// Start delay for a `data-load-reveal` element (see globals.css), so the hero builds up in order.
const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

const HEADLINE = ["Everything shared", "Nothing forgotten"];

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=in.kinwoo.app";
const WEB_APP_URL = "https://app.kinwoo.in/";
const DEVELOPER_URL = "https://www.cbsdev.me/";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-black text-white [--title-size:clamp(1.75rem,4.5vw,2.75rem)]">
      <header className="relative px-6 pt-6 sm:px-10 sm:pt-10">
        <Image
          src={wordmark}
          alt="Kinwoo"
          priority
          data-load-reveal="blur"
          className="h-7 w-auto sm:h-8"
        />
      </header>

      <section className="relative flex flex-col items-center px-6 pt-20 text-center sm:pt-16">
        <p
          data-load-reveal="blur"
          style={delay(90)}
          className="text-sm text-neutral-500 tracking-wide"
        >
          Built for better days at home
        </p>
        <h1 className="mt-3 text-(length:--title-size) leading-normal font-normal tracking-wide">
          {/* Word by word, each fading up out of a blur. */}
          {HEADLINE.map((line, l) => (
            <span key={line} className="block">
              {line.split(" ").map((word, w, words) => (
                <span key={word}>
                  <span
                    data-load-reveal="blur"
                    style={delay(180 + (l * words.length + w) * 70)}
                    className="inline-block"
                  >
                    {word}
                  </span>
                  {w < words.length - 1 && " "}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </section>

      {/* Wraps the buttons and phone so the sticker layer can span exactly that stretch. */}
      <div className="relative mt-8">
        <div className="relative flex flex-col items-center justify-center gap-4 px-6 sm:gap-6 lg:flex-row">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-load-reveal="blur"
            style={delay(480)}
            className="flex h-11 items-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Image src={playStore} alt="" className="size-5" />
            Get it on Play Store
          </a>
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-load-reveal="blur"
            style={delay(560)}
            className="flex h-9 items-center gap-2 border-b-[0.75px] border-white text-base font-normal transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Open Web App
            <Image src={webIcon} alt="" className="size-4" />
          </a>
        </div>

        <section className="relative mt-12 flex justify-center">
          {/*
          The phone frame fills only ~34% of the base screenshot's width; the rest is transparent
          padding. It is sized so the frame is ~9.5x the title size (a bit wider than the headline),
          and it is allowed to overflow its container sideways, centered, with main clipping it.
        */}
          <PhoneScreens
            data-load-reveal="soft"
            style={delay(640)}
            className="relative w-[calc(var(--title-size)*28)] max-w-none shrink-0"
          />
          <BottomDissolve />
          <Stickers />
        </section>
      </div>

      {/*
        Pulled up into the dissolve so the faded screenshot flows straight into the footer,
        then extended downward on the same black background.
      */}
      <footer className="relative mt-[calc(-3*var(--title-size))] px-6 pt-[calc(var(--title-size)*2.5_+_9rem)] pb-8 text-sm font-medium sm:px-10 sm:pt-[calc(var(--title-size)*2.5_+_12rem)] sm:pb-10">
        <Reveal className="mb-48 flex flex-col items-center gap-6 -mt-2 text-center">
          <h2 className="text-(length:--title-size) leading-normal font-normal mb-2 px-2">
            Try it before the rest of the world does
          </h2>
          <TestingProgramForm />
        </Reveal>
        {/* Sits at the very bottom of the page, so it must reveal as soon as it's on screen. */}
        <Reveal
          rootMargin="0px"
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
        >
          <nav aria-label="Legal" className="flex gap-6">
            {(["privacy", "terms"] as const).map((key) => (
              <Link
                key={key}
                href={LEGAL_PATHS[key]}
                className="text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-xs font-normal tracking-wide"
              >
                {LEGAL_LABELS[key]}
              </Link>
            ))}
          </nav>
          <p>
            Developed by{" "}
            <a
              href={DEVELOPER_URL}
              className="text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white tracking-wide"
            >
              @CBSDev
            </a>
          </p>
        </Reveal>
      </footer>
    </main>
  );
}

type Sticker = {
  src: StaticImageData;
  // 0% is the middle of the Play Store button and 100% is the bottom of the screenshot.
  top: string;
  // Which column beside the phone the sticker sits in.
  side: "left" | "right";
  // Distance from the page edge, as a % of the column width. Negative values bleed off the page.
  x: number;
  size: string;
  rotate: number;
  // Shown on small screens too; the rest only appear from the md breakpoint up.
  mobile?: boolean;
};

// Alternating sides, with gaps that tighten only slightly toward the bottom (16% → 10%), so the
// lower half feels fuller without the stickers crowding each other.
const STICKERS: Sticker[] = [
  {
    src: sticker01,
    top: "0%",
    side: "left",
    x: 10,
    size: "clamp(2.75rem,8vw,6.5rem)",
    rotate: -18,
    mobile: true,
  },
  {
    src: sticker07,
    top: "3%",
    side: "right",
    x: 12,
    size: "clamp(2.75rem,7.5vw,6rem)",
    rotate: 20,
    mobile: true,
  },
  { src: sticker06, top: "16%", side: "left", x: 72, size: "clamp(2rem,3vw,2.5rem)", rotate: 28 },
  {
    src: sticker08,
    top: "22%",
    side: "right",
    x: 55,
    size: "clamp(2.75rem,4.5vw,3.5rem)",
    rotate: -16,
  },
  {
    src: sticker02,
    top: "30%",
    side: "left",
    x: 8,
    size: "clamp(2.5rem,4vw,3.25rem)",
    rotate: 22,
    mobile: true,
  },
  {
    src: sticker09,
    top: "37%",
    side: "right",
    x: 6,
    size: "clamp(2.5rem,6.5vw,5.25rem)",
    rotate: 6,
    mobile: true,
  },
  { src: sticker04, top: "43%", side: "left", x: 50, size: "clamp(3rem,5vw,4rem)", rotate: 14 },
  {
    src: sticker13,
    top: "50%",
    side: "right",
    x: 60,
    size: "clamp(2.5rem,4vw,3.25rem)",
    rotate: 18,
  },
  {
    src: sticker03,
    top: "55%",
    side: "left",
    x: 6,
    size: "clamp(2.75rem,7vw,5.5rem)",
    rotate: -8,
    mobile: true,
  },
  {
    src: sticker10,
    top: "61%",
    side: "right",
    x: 18,
    size: "clamp(2.75rem,7.5vw,6rem)",
    rotate: -12,
    mobile: true,
  },
  {
    src: sticker05,
    top: "66%",
    side: "left",
    x: 55,
    size: "clamp(3.5rem,6.5vw,5.25rem)",
    rotate: -24,
  },
  {
    src: sticker14,
    top: "71%",
    side: "right",
    x: 70,
    size: "clamp(2.25rem,4vw,3.25rem)",
    rotate: -20,
  },
  {
    src: sticker15,
    top: "76%",
    side: "left",
    x: 12,
    size: "clamp(2.5rem,5.5vw,4.5rem)",
    rotate: 12,
    mobile: true,
  },
  {
    src: sticker16,
    top: "81%",
    side: "right",
    x: 8,
    size: "clamp(2.75rem,6.5vw,5.25rem)",
    rotate: 16,
    mobile: true,
  },
  {
    src: sticker18,
    top: "86%",
    side: "left",
    x: 58,
    size: "clamp(2.25rem,4.5vw,3.75rem)",
    rotate: -28,
  },
];

function Stickers() {
  return (
    // Lives inside the screenshot section. On mobile it starts a bit below the top of the
    // screenshot; from md up it reaches back up to the middle of the 2.75rem (h-11) buttons
    // (button height + the section's mt-12, minus half a button = 4.375rem). Ends at the bottom.
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[12%] bottom-0 [--sticker-scale:0.8] md:-top-[4.375rem] md:[--sticker-scale:1]"
    >
      {(["left", "right"] as const).map((side) => (
        // One column on each side of the phone. The frame is ~9.3x the title size wide, so each
        // column stops a little short of its edge (5x the title size from the center).
        <div
          key={side}
          className={`absolute inset-y-0 w-[calc(50%-var(--title-size)*5)] ${side === "left" ? "left-0" : "right-0"}`}
        >
          {STICKERS.map(({ src, top, side: s, x, size, rotate, mobile }, i) =>
            s === side ? (
              // Pops in when scrolled into view. Stickers already on screen at load wait for the
              // hero, then pop in a scattered order (7 and 15 are coprime, so every sticker gets
              // its own slot); later ones get a small varied delay.
              <Reveal
                key={i}
                variant="pop"
                initialDelay={720 + ((i * 7) % STICKERS.length) * 55}
                delay={(i % 3) * 80}
                className={`absolute ${mobile ? "" : "hidden md:block"}`}
                style={
                  {
                    top,
                    // Never past the column's inner edge, with room for the rotated corners.
                    [side]: `min(${x}%, calc(100% - ${size} * var(--sticker-scale) * 1.2))`,
                    width: `calc(${size} * var(--sticker-scale))`,
                    rotate: `${rotate}deg`,
                    // Spins in from the opposite side of its resting angle.
                    "--pop-spin": `${rotate > 0 ? -40 : 40}deg`,
                  } as CSSProperties
                }
              >
                <Image
                  src={src}
                  alt=""
                  sizes="128px"
                  className="h-auto w-full opacity-90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                />
              </Reveal>
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
}

/** Fades the bottom of the screenshot into the page background. */
function BottomDissolve() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[calc(var(--title-size)*3.5)] md:h-[calc(var(--title-size)*4)] bg-linear-to-b from-transparent via-black/70 via-60% to-black"
    />
  );
}
