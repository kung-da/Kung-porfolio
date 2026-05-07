import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { MapPin } from "lucide-react";

type Cat = "Mountains" | "Ocean" | "City" | "Anime";

const ITEMS: { id: number; category: Cat; location: string; seed: string; h: number }[] = [
  { id: 1, category: "Mountains", location: "Mt. Fuji, Japan", seed: "fuji", h: 500 },
  { id: 2, category: "Ocean", location: "Phú Quốc, Vietnam", seed: "ocean1", h: 360 },
  { id: 3, category: "City", location: "Tokyo, Japan", seed: "tokyo1", h: 420 },
  { id: 4, category: "Anime", location: "Kamakura, Japan", seed: "anime1", h: 300 },
  { id: 5, category: "Mountains", location: "Sa Pa, Vietnam", seed: "sapa", h: 460 },
  { id: 6, category: "Ocean", location: "Da Nang, Vietnam", seed: "ocean2", h: 320 },
  { id: 7, category: "City", location: "Osaka, Japan", seed: "osaka", h: 380 },
  { id: 8, category: "Anime", location: "Akihabara, Japan", seed: "akiba", h: 440 },
  { id: 9, category: "Mountains", location: "Hà Giang, Vietnam", seed: "hagiang", h: 520 },
  { id: 10, category: "Ocean", location: "Okinawa, Japan", seed: "okinawa", h: 340 },
  { id: 11, category: "City", location: "HCMC, Vietnam", seed: "hcmc", h: 400 },
  { id: 12, category: "Anime", location: "Kyoto, Japan", seed: "kyoto", h: 480 },
];

const CAT_COLOR: Record<Cat, string> = {
  Mountains: "#00BFFF",
  Ocean: "#8aa4ff",
  City: "#f5a623",
  Anime: "#f2a7c3",
};

export const Gallery = () => {
  const [filter, setFilter] = useState<"All" | Cat>("All");

  const items = useMemo(
    () => (filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter)),
    [filter]
  );

  return (
    <section id="journey" className="relative py-[100px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="05 / JOURNEY"
          title="The Journey"
          subtitle={<span><span className="font-jp">景色</span> · Cảnh Đẹp · Scenery</span>}
        />

        <div className="flex flex-wrap gap-2 mb-8">
          {(["All", "Mountains", "Ocean", "City", "Anime"] as const).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  background: active ? "#00BFFF" : "transparent",
                  color: active ? "#0a0f1e" : "rgba(232,240,255,0.7)",
                  border: active ? "1px solid #00BFFF" : "1px solid rgba(0,191,255,0.3)",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div
          style={{
            columnCount: 3,
            columnGap: 12,
          }}
          className="[@media(max-width:900px)]:!columns-2 [@media(max-width:600px)]:!columns-1"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-[10px] overflow-hidden mb-3 group cursor-pointer"
              style={{ breakInside: "avoid" }}
            >
              <img
                src={`https://picsum.photos/seed/${item.seed}/600/${item.h}`}
                alt={item.location}
                className="w-full block transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div
                className="absolute inset-0 transition-opacity"
                style={{
                  background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))",
                }}
              />
              <span
                className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: `${CAT_COLOR[item.category]}25`,
                  color: CAT_COLOR[item.category],
                  border: `1px solid ${CAT_COLOR[item.category]}80`,
                }}
              >
                {item.category}
              </span>
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
                <MapPin size={14} />
                {item.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
