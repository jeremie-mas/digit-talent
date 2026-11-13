import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import type { Cohort } from "@/data/cohorts";

/** Carrousel de photos des cohortes : défilement automatique, pause au survol, flèches et points. */
export function CohortSlider({ cohorts }: { cohorts: Cohort[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [api, paused]);

  if (cohorts.length === 0) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
        <CarouselContent className="-ml-4">
          {cohorts.map((c, i) => (
            <CarouselItem key={`${c.title}-${i}`} className="pl-4 md:basis-[85%] lg:basis-[70%]">
              <figure className="group relative overflow-hidden rounded-2xl">
                <img
                  src={c.image}
                  alt={c.period ? `${c.title}, ${c.period}` : c.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105 md:aspect-[16/9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {[c.period, c.place].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-2 text-xl font-semibold sm:text-2xl">{c.title}</p>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {cohorts.map((c, i) => (
            <button
              key={`${c.title}-dot-${i}`}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`${i + 1} / ${cohorts.length}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-accent" : "w-3 bg-navy/20 hover:bg-navy/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-accent hover:bg-accent hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-accent hover:bg-accent hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
