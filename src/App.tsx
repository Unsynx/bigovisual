import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ComplexityChart } from './ComplexityChart'
import { CodeBlock } from './CodeBlock'
import { LINEAR, CONSTANT, SQUARED } from "./lib/codeData";
import './App.css'

function App() {
  const [count, setCount] = useState(0),
        [ticking, setTicking] = useState(false),
        [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setTick(tick + 1), 1e2);
    return () => clearTimeout(timer);
  }, [tick, ticking]);

  return (
    <>
      <div className='container_side'>
        <div className='side_left'>
          <CodeBlock n={count} tick={tick} codeData={LINEAR}></CodeBlock>
          <CodeBlock n={count} tick={tick} codeData={CONSTANT}></CodeBlock>
          <CodeBlock n={count} tick={tick} codeData={SQUARED}></CodeBlock>
        </div>
        <div className='side_right'>
          <div className='graph'>
            <ComplexityChart n={count} lines={[LINEAR, CONSTANT, SQUARED]} />
          </div>
          <div className='control'>
            <p>N: {count} Tick: {tick}</p>
            <div className='button_row'>
              <Button onClick={() => setCount((count) => count - 1)}>Decrease N -1</Button>
              <Button onClick={() => setCount((count) => count + 1)}>Increase N +1</Button>
              <Button onClick={() => setCount((count) => count - 10)}>Decrease N -10</Button>
              <Button onClick={() => setCount((count) => count + 10)}>Increase N +10</Button>
              <Button onClick={() => setCount(() => 0)}>Reset</Button>
              <Button onClick={() => setTicking(() => true)}>Run</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
