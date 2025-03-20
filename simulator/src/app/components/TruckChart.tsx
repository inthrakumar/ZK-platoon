'use client'
import React, { useEffect, useRef } from "react";

const TruckSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let offset = 0; // Background movement offset

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const trucks = [
      { x: 100, y: 250 },
      { x: 200, y: 250 },
      { x: 300, y: 250 },
      { x: 400, y: 250 },
      { x: 500, y: 250 },
      { x: 600, y: 250 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw moving background
      ctx.fillStyle = "#888";
      ctx.fillRect(0, 280, canvas.width, 120); // Road

      // Draw road lines correctly (continuous looping)
      ctx.fillStyle = "white";
      const lineWidth = 50; // Width of each road line
      const lineSpacing = 100; // Space between road lines
      const totalLines = Math.ceil(canvas.width / lineSpacing) + 1; // Ensure full coverage

      for (let i = 0; i < totalLines; i++) {
        let x = (i * lineSpacing - offset) % canvas.width;
        if (x < -lineWidth) x += canvas.width; // Wrap around smoothly
        ctx.fillRect(x, 320, lineWidth, 5);
      }

      // Draw trucks
      trucks.forEach((truck) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(truck.x, truck.y, 50, 30); // Truck body

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(truck.x + 10, truck.y + 30, 5, 0, Math.PI * 2); // Front wheel
        ctx.arc(truck.x + 40, truck.y + 30, 5, 0, Math.PI * 2); // Back wheel
        ctx.fill();
      });

      offset = (offset + 5) % lineSpacing; // Ensure smooth looping
      requestAnimationFrame(draw); // Keep animating
    };

    draw(); // Start animation
  }, []);

  return (
    <canvas ref={canvasRef} width={800} height={400} style={{ border: "1px solid black" }} />
  );
};

export default TruckSimulation;

