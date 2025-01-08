import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
  color: string;
}

interface IconCloudProps {
  images?: string[];
  backgroundColor?: string;
  glowColor?: string;
  glowIntensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B97B2', '#D3F3F1', '#E9B824', '#219C90'
];

export function IconCloud({
  images = [],
  backgroundColor = 'transparent',
  glowColor = '#4ECDC4',
  glowIntensity = 0.5,
  rotationSpeed = 1,
  interactive = true
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  // Generate initial positions with color assignments
  useEffect(() => {
    const newIcons: Icon[] = [];
    const numIcons = images.length;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      newIcons.push({
        x: Math.cos(phi) * r * 120,
        y: y * 120,
        z: Math.sin(phi) * r * 120,
        scale: 1,
        opacity: 1,
        id: i,
        color: COLORS[i % COLORS.length]
      });
    }
    setIconPositions(newIcons);
  }, [images]);

  // Handle image loading and canvas preparation
  useEffect(() => {
    imagesLoadedRef.current = new Array(images.length).fill(false);
    const newIconCanvases = images.map((imageUrl, index) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 65;
      offscreen.height = 65;
      const offCtx = offscreen.getContext('2d');

      if (offCtx) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        img.onload = () => {
          offCtx.clearRect(0, 0, 48, 48);
          
          // Create square shape
          offCtx.beginPath();
          const numberOfSides = 4;
          const size = 50;
          const Xcenter = 24;
          const Ycenter = 24;

          offCtx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
          for (let i = 1; i <= numberOfSides; i++) {
            offCtx.lineTo(
              Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
              Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
            );
          }
          offCtx.closePath();
          offCtx.clip();

          // Draw image with smooth edges
          offCtx.drawImage(img, 0, 0, 48, 48);
          
          // Add subtle inner glow
          offCtx.shadowColor = glowColor;
          offCtx.shadowBlur = 8;
          offCtx.strokeStyle = 'rgba(255,255,255,0.3)';
          offCtx.stroke();

          imagesLoadedRef.current[index] = true;
        };
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [images, glowColor]);

  // Animation and rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animate = () => {
      // Clear the canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isDragging && interactive) {
        rotationRef.current = {
          x: rotationRef.current.x + 0.002 * rotationSpeed,
          y: rotationRef.current.y + 0.003 * rotationSpeed
        };
      }

      // Sort icons by z-index for proper layering
      const sortedIcons = [...iconPositions].sort((a, b) => {
        const aZ = a.z * Math.cos(rotationRef.current.x) + a.y * Math.sin(rotationRef.current.x);
        const bZ = b.z * Math.cos(rotationRef.current.x) + b.y * Math.sin(rotationRef.current.x);
        return aZ - bZ;
      });

      sortedIcons.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 250) / 350;
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 200) / 250));

        ctx.save();
        ctx.translate(
          canvas.width/2 + rotatedX,
          canvas.height/2 + rotatedY
        );
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        // Add glow effect
        ctx.shadowColor = icon.color;
        ctx.shadowBlur = 15 * glowIntensity;

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(iconCanvasesRef.current[index], -24, -24, 48, 48);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [backgroundColor, glowColor, glowIntensity, iconPositions, isDragging, rotationSpeed, interactive]);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    setIsDragging(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !isDragging) return;
    const deltaX = e.clientX - mousePos.x;
    const deltaY = e.clientY - mousePos.y;
    
    rotationRef.current = {
      x: rotationRef.current.x + deltaY * 0.005,
      y: rotationRef.current.y + deltaX * 0.005
    };
    
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full"
        style={{
          cursor: interactive ? 'grab' : 'default'
        }}
      />
    </motion.div>
  );
}

export default IconCloud;