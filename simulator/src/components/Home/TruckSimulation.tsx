"use client";
import { useEffect, useRef, useState } from "react";
import { zk_platoon } from "../../utils/zk_platoon";


const TruckSimulation = ({
  start,
  faulty,
  count,
  setfaulty,
  setCount,
}: {
  start: boolean;
  faulty: boolean;
  count: number;
  setfaulty: (val: boolean) => void;
  setCount: (val: number) => void;
}) => {
  zk_platoon.generateProof();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [positions, setPositions] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [reqId, setreqId] = useState<number | null>(null);
  const [isFaulty, setFaultyNodes] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  let offset = 0;

  useEffect(() => {
    if (!start) {
      setPositions([0, 1, 2, 3, 4, 5]); // Reset positions
      setFaultyNodes([false, false, false, false, false, false]); // Reset faults
      setCount(0);
      if (reqId) {
        cancelAnimationFrame(reqId);
        setreqId(null);
      }
    }
  }, [start]);

  useEffect(() => {
    if (!start) return;
    const intervalId = setInterval(() => {
      setPositions((prev) => prev.map((p) => p + 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start]);

  useEffect(() => {
    if (!faulty) return;
    if (count === 2) return;

    const setRandomFaultyNode = () => {
      while (true) {
        const randomInt = Math.floor(Math.random() * 6);
        if (!isFaulty[randomInt]) {
          setFaultyNodes((prev) => {
            const newFaulty = [...prev];
            newFaulty[randomInt] = true;
            return newFaulty;
          });
          break;
        }
      }
      setPositions([0, 1, 2, 3, 4, 5]);
      setfaulty(false);
      setCount(count + 1);
    };

    setRandomFaultyNode();
  }, [faulty]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!start) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const xUnit = (canvas.width - 100) / 6;

    const trucks = [
      { xPosition: 0, y: 250, position: positions[0] },
      { xPosition: 1, y: 250, position: positions[1] },
      { xPosition: 2, y: 250, position: positions[2] },
      { xPosition: 3, y: 250, position: positions[3] },
      { xPosition: 4, y: 250, position: positions[4] },
      { xPosition: 5, y: 250, position: positions[5] },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 300);
      ctx.lineTo(canvas.width - 50, 300);
      ctx.stroke();

      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      for (let i = 0; i <= 5; i++) {
        const x = 50 + i * xUnit;
        ctx.beginPath();
        ctx.moveTo(x, 300);
        ctx.lineTo(x, 310);
        ctx.stroke();
        ctx.fillText(i.toString(), x - 5, 325);
      }

      ctx.fillStyle = "#888";
      ctx.fillRect(0, 350, canvas.width, 50);
      ctx.fillStyle = "white";
      const lineWidth = 50;
      const lineSpacing = 100;
      const totalLines = Math.ceil(canvas.width / lineSpacing) + 1;

      for (let i = 0; i < totalLines; i++) {
        let x = (i * lineSpacing - offset) % canvas.width;
        if (x < -lineWidth) x += canvas.width;
        ctx.fillRect(x, 375, lineWidth, 5);
      }

      ctx.fillStyle = "rgba(255, 200, 200, 0.3)";
      ctx.fillRect(canvas.width - 200, 50, 180, 180);
      ctx.fillStyle = "#000";
      ctx.font = "16px Arial";
      ctx.fillText("Faulty Trucks", canvas.width - 180, 75);

      let faultyTruckCount = 0;
      let legitTruckCount = 0;
      trucks.forEach((truck, index) => {
        const isFaultyTruck = isFaulty[index];

        if (isFaultyTruck) {
          const cornerX = canvas.width - 170;
          const cornerY = 100 + faultyTruckCount * 60;

          ctx.fillStyle = "red";
          ctx.fillRect(cornerX, cornerY, 50, 30);

          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.arc(cornerX + 10, cornerY + 30, 5, 0, Math.PI * 2);
          ctx.arc(cornerX + 40, cornerY + 30, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "black";
          ctx.font = "14px Arial";
          let char = String.fromCharCode(65+truck.xPosition);
          ctx.fillText(`Truck ${char}`, cornerX + 60, cornerY + 15);


          faultyTruckCount++;
        } else {
          const x = 50 + legitTruckCount * xUnit - 25;

          ctx.fillStyle = "blue";
          ctx.fillRect(x, truck.y, 50, 30);

          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.arc(x + 10, truck.y + 30, 5, 0, Math.PI * 2);
          ctx.arc(x + 40, truck.y + 30, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "black";
          ctx.font = "14px Arial";
          let char = String.fromCharCode(65 + truck.xPosition);
          ctx.fillText(`Truck ${char}`, x - 10, truck.y - 20);
          ctx.fillText(`Position: ${truck.position}`, x - 10, truck.y - 10);
          legitTruckCount++;
        }
      });

      offset = (offset + 2) % lineSpacing;
      const newReqId = requestAnimationFrame(animate);
      setreqId(newReqId);
    };

    animate();
  }, [positions, start, isFaulty]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ border: "1px solid black", background: "white" }}
      />
      <div className="mt-4 text-lg">
        Trucks positioned from 0 to 6 on x-axis, incrementing once per second
      </div>
    </div>
  );
};

export default TruckSimulation;
