import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./Stack.css";

type StackCard = {
  id: number;
  content: ReactNode;
};

type StackProps = {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: {
    stiffness: number;
    damping: number;
  };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
};

type CardRotateProps = {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
};

const CardRotate = ({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [24, -24]);
  const rotateY = useTransform(x, [-100, 100], [-24, 24]);

  if (disableDrag) {
    return <motion.div className="stack-card-rotate stack-card-rotate-disabled">{children}</motion.div>;
  }

  return (
    <motion.div
      className="stack-card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.55}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
          onSendToBack();
          return;
        }

        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export const Stack = ({
  randomRotation = false,
  sensitivity = 160,
  cards = [],
  animationConfig = { stiffness: 260, damping: 22 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}: StackProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState<StackCard[]>(() =>
    cards.map((content, index) => ({ id: index + 1, content }))
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    setStack(cards.map((content, index) => ({ id: index + 1, content })));
  }, [cards]);

  const sendToBack = (id: number) => {
    setStack((current) => {
      const next = [...current];
      const index = next.findIndex((card) => card.id === id);
      if (index < 0) return current;

      const [card] = next.splice(index, 1);
      next.unshift(card);
      return next;
    });
  };

  useEffect(() => {
    if (!autoplay || stack.length < 2 || isPaused) return;

    const interval = window.setInterval(() => {
      const topCard = stack[stack.length - 1];
      if (topCard) sendToBack(topCard.id);
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused, stack]);

  const disableDrag = mobileClickOnly && isMobile;
  const enableClick = sendToBackOnClick || disableDrag;

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const depth = stack.length - index - 1;
        const visibleDepth = Math.min(depth, 3);
        const rotationOffset = randomRotation ? ((card.id * 5) % 3) - 1 : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={disableDrag}
          >
            <motion.div
              className="stack-card"
              onClick={() => enableClick && sendToBack(card.id)}
              animate={{
                rotateZ: visibleDepth * 1.15 + rotationOffset,
                scale: 1 - visibleDepth * 0.025,
                x: visibleDepth * 5,
                y: visibleDepth * 3,
                transformOrigin: "50% 50%",
              }}
              initial={false}
              transition={{ type: "spring", ...animationConfig }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
};

export default Stack;
