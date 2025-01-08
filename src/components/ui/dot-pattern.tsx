import { useId } from "react";

import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  gradientDirection?: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  [key: string]: unknown;
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  gradientDirection = "bottom-right",
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  // Map gradient direction to coordinates
  const gradientCoords = {
    "left": { x1: "100%", y1: "0%", x2: "0%", y2: "0%" },
    "right": { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
    "top": { x1: "0%", y1: "100%", x2: "0%", y2: "0%" },
    "bottom": { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
    "top-left": { x1: "100%", y1: "100%", x2: "0%", y2: "0%" },
    "top-right": { x1: "0%", y1: "100%", x2: "100%", y2: "0%" },
    "bottom-left": { x1: "100%", y1: "0%", x2: "0%", y2: "100%" },
    "bottom-right": { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
  };

  const { x1, y1, x2, y2 } = gradientCoords[gradientDirection];

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className,
      )}
      {...props}
    >
      <defs>
        {/* Define the dot pattern */}
        <pattern
          id={`pattern-${id}`}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>

        {/* Define the gradient mask */}
        <mask id={`mask-${id}`} maskUnits="objectBoundingBox">
          <rect
            width="100%"
            height="100%"
            fill="url(#gradient)"
          />
        </mask>
        <linearGradient id="gradient" x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#pattern-${id})`}
        mask={`url(#mask-${id})`}
      />
    </svg>
  );
}

export default DotPattern;
