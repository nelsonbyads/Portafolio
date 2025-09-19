import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import "./carousel.css";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  itemClassName?: string;
};

export default function Carousel({ children, className, itemClassName }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const childArray = useMemo(() => React.Children.toArray(children), [children]);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateButtons());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByOne = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".carousel-item");
    const w = first ? first.offsetWidth : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
  };

  return (
    <div className={cn("carousel relative", className)}>
      <div ref={trackRef} className="carousel-track" aria-roledescription="carousel">
        {childArray.map((ch, idx) => (
          <div key={idx} className={cn("carousel-item", itemClassName)}>
            {ch}
          </div>
        ))}
      </div>
      <button
        aria-label="Anterior"
        className={cn("carousel-btn left-2", !canPrev && "pointer-events-none opacity-40")}
        onClick={() => scrollByOne(-1)}
      >
        ‹
      </button>
      <button
        aria-label="Siguiente"
        className={cn("carousel-btn right-2", !canNext && "pointer-events-none opacity-40")}
        onClick={() => scrollByOne(1)}
      >
        ›
      </button>
    </div>
  );
}

