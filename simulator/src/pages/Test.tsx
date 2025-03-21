import React, { useState } from 'react'
import TruckChart from "../components/Home/TruckSimulation";
function Test() {
      const [start, setStart] = useState(true);
      const [faulty, setfaulty] = useState(false);
      const [count, setCount] = useState(0);
  return (
    <div>
<TruckChart start={start} count={count} setCount={setCount} faulty={faulty} setfaulty={setfaulty} />
    </div>
  )
}

export default Test