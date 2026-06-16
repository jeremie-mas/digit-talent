import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1800, startOnMount = false) {
  const [value, setValue] = useState(startOnMount ? 0 : target);
  const started = useRef(startOnMount);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (startOnMount) {
      run();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  function run() {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return { value, ref };
}
