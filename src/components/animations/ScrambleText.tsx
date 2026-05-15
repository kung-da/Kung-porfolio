import { useEffect, useState, useRef } from "react";

const JAPANESE_CHARS = "アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrambleText = ({ text, delay = 0, duration = 1.5, className = "" }: ScrambleTextProps) => {
  const [output, setOutput] = useState("");
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frameCountRef = useRef(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const setup = () => {
      const queue = [];
      for (let i = 0; i < text.length; i++) {
        const from = JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
        const to = text[i];
        // Reduced ranges for a faster reveal (1.5x faster)
        const start = Math.floor(Math.random() * 53);
        const end = start + Math.floor(Math.random() * 67);
        queue.push({ from, to, start, end });
      }
      queueRef.current = queue;
    };

    const update = () => {
      let complete = 0;
      let newOutput = "";

      for (let i = 0; i < queueRef.current.length; i++) {
        let { from, to, start, end, char } = queueRef.current[i];

        if (frameCountRef.current >= end) {
          complete++;
          newOutput += to;
        } else if (frameCountRef.current >= start) {
          // Faster character rotation
          if (!char || Math.random() < 0.3) {
            char = JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
            queueRef.current[i].char = char;
          }
          newOutput += char;
        } else {
          newOutput += " ";
        }
      }

      setOutput(newOutput);

      if (complete === queueRef.current.length) {
        cancelAnimationFrame(frameRef.current);
      } else {
        frameCountRef.current++;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    timer = setTimeout(() => {
      setup();
      update();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{output}</span>;
};
