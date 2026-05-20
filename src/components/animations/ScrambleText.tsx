import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ";

type ScrambleQueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const randomGlyph = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

export const ScrambleText = ({ text, delay = 0, duration = 1.5, className = "" }: ScrambleTextProps) => {
  const [output, setOutput] = useState("");
  const frameRef = useRef(0);
  const frameCountRef = useRef(0);
  const queueRef = useRef<ScrambleQueueItem[]>([]);

  useEffect(() => {
    frameCountRef.current = 0;
    queueRef.current = Array.from(text).map((to) => {
      const start = Math.floor(Math.random() * 53);
      const end = start + Math.floor(Math.random() * Math.max(24, duration * 44));
      return { from: randomGlyph(), to, start, end };
    });

    const update = () => {
      let complete = 0;
      let nextOutput = "";

      queueRef.current.forEach((item) => {
        if (frameCountRef.current >= item.end) {
          complete += 1;
          nextOutput += item.to;
          return;
        }

        if (frameCountRef.current >= item.start) {
          if (!item.char || Math.random() < 0.3) item.char = randomGlyph();
          nextOutput += item.char;
          return;
        }

        nextOutput += " ";
      });

      setOutput(nextOutput);

      if (complete < queueRef.current.length) {
        frameCountRef.current += 1;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    const timer = setTimeout(update, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration]);

  return <span className={className}>{output}</span>;
};
