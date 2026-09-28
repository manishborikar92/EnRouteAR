"use client";

import { useEffect, useRef } from "react";

export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.15 + 0.03,
      }));
    };

    const drawGrid = () => {
      const spacing = 60;
      ctx.strokeStyle = "rgba(0,180,255,0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawStars = () => {
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,230,255,${s.alpha})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -2) {
          s.y = height + 2;
          s.x = Math.random() * width;
        }
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawStars();
      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    initStars();
    render();

    const handleResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="scanlines fixed inset-0 z-1 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
