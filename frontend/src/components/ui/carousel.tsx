"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
  link: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  totalSlides: number;
  position: "left" | "center" | "right";
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, totalSlides, position, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, link } = slide;

  // Determine if this is the current slide
  const isCurrent = position === "center";

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className={`flex flex-1 flex-col items-center justify-center relative text-center text-[#E8D8C4] opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 ${
          position === "left" ? "opacity-70" : position === "right" ? "opacity-70" : "opacity-100"
        }`}
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              isCurrent
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[100%] h-[100%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: isCurrent ? 1 : 0.7,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {isCurrent && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            isCurrent ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">
            {title}
          </h2>
          <div className="flex justify-center">
            <Link 
              href={link}
              onClick={(e) => e.stopPropagation()} 
              className="mt-6 px-4 py-2 w-fit mx-auto sm:text-sm text-[#E8D8C4] bg-[#6D2932] h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              {button}
            </Link>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`md:w-10 md:h-10 flex items-center mx-2 justify-center bg-[#561C24] border-3 border-transparent rounded-full focus:border-[#cdbba5] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <ChevronRight className="text-white dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

const Carousel = ({ slides }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  // Get the three slides to display (previous, current, next in circular order)
  const getDisplaySlides = () => {
    const total = slides.length;

    const prevIndex = (current - 2 + total) % total;
    const prevIndex2 = (current - 1 + total) % total;
    const nextIndex = (current + 1) % total;

    if (isMobile) {
      return [
        { slide: slides[prevIndex2], index: prevIndex2, position: "left" as const },
        { slide: slides[current], index: current, position: "center" as const },
        { slide: slides[nextIndex], index: nextIndex, position: "right" as const },
      ];
    }

    return [
      { slide: slides[prevIndex], index: prevIndex, position: "left" as const },
      { slide: slides[prevIndex2], index: prevIndex2, position: "center" as const },
      { slide: slides[current], index: current, position: "center" as const },
      { slide: slides[nextIndex], index: nextIndex, position: "right" as const },
    ];
  };

  const displaySlides = getDisplaySlides();
  const id = useId();

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="flex justify-center items-center py-12">
        {displaySlides.map(({ slide, index, position }) => (
          <Slide
            key={`${index}-${position}`}
            slide={slide}
            index={index}
            current={current}
            totalSlides={slides.length}
            position={position}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === index 
                  ? "w-4 bg-[#561C24]" 
                  : "bg-[#978284] hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default Carousel;