"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { id: 1, image: "/slide1.png", alt: "Banner promo 1" },
  { id: 2, image: "/slide2.png", alt: "Banner promo 2" },
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[416/205] w-full overflow-hidden rounded-[15px] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)] md:shadow-[0_10px_22px_rgba(0,0,0,0.14)]">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-full w-full flex-shrink-0">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={slide.id === 1}
              sizes="(max-width: 768px) 100vw, 430px"
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-6 bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
