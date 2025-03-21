import { useEffect, useRef, useState } from "react";

const TruckSimulation = ({
  start,
  faulty,
   setfaulty,
    count,
    setCount
}: {
  start: boolean;
  faulty: boolean;
        setfaulty:(val:boolean)=>void;
  count:number ;
  setCount :(val:number)=>void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [positions, setPositions] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [isFaulty, setFaulty] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  let offset = 0; // Background movement offset
  useEffect(() => {
    // Set up the interval to increment positions once per second
    const intervalId = setInterval(() => {
      if (!start) return;
      setPositions((prev) => prev.map((p) => p + 1));
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [start]);
    useEffect(()=>{
        if(!faulty) return ;
        const setRandomFaultyNode =()=>{
            setCount(++count);
            setfaulty(false);
        }
        setRandomFaultyNode();
    },[faulty])
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!start) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const xUnit = (canvas.width - 100) / 6;

    const trucks = [
      { xPosition: 0, y: 250 },
      { xPosition: 1, y: 250 },
      { xPosition: 2, y: 250 },
      { xPosition: 3, y: 250 },
      { xPosition: 4, y: 250 },
      { xPosition: 5, y: 250 },
      { xPosition: 6, y: 250 },
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
      for (let i = 0; i <= 6; i++) {
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

      trucks.forEach((truck, index) => {
        const x = 50 + truck.xPosition * xUnit - 25;
        const isFaultyTruck = isFaulty[index];
        // Draw truck
        ctx.fillStyle = isFaultyTruck ? "red" : "blue";
        ctx.fillRect(x, truck.y, 50, 30); // Truck body

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + 10, truck.y + 30, 5, 0, Math.PI * 2); // Front wheel
        ctx.arc(x + 40, truck.y + 30, 5, 0, Math.PI * 2); // Back wheel
        ctx.fill();

        const currentPosition = positions[index];

        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(`Position: ${currentPosition}`, x - 10, truck.y - 10);

        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x + 25, truck.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      offset = (offset + 2) % lineSpacing;
      requestAnimationFrame(animate);
    };

    animate(); // Start animation
  }, [positions, start]); // Re-run when positions update

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
