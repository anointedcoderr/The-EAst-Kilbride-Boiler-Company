"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

export function useStaggerReveal(containerSelector: string) {
  useEffect(() => {
    const containers = document.querySelectorAll(containerSelector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".reveal, .reveal-scale");
            children.forEach((child) => child.classList.add("revealed"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    containers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerSelector]);
}
