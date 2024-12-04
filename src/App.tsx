import { useState, useEffect } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { ComplexityChart } from './ComplexityChart'
import { CodeBlock } from './CodeBlock'
import { LINEAR } from "./lib/codeData";

function App() {
  const [count, setCount] = useState(0),
        [ticking, setTicking] = useState(true),
        [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setTick(tick + 1), 1e2);
    return () => clearTimeout(timer);
  }, [tick, ticking]);

  return (
    <>
      <div className='container_side'>
        <div className='side_left'>
          <CodeBlock n={tick} codeData={LINEAR}></CodeBlock>
        </div>
        <div className='side_right'>
          <div className='graph'>
            <ComplexityChart n={count} lines={[LINEAR]} />
          </div>
          <div className='control'>
            <p>Current Step: {count} Tick: {tick}</p>
            <div className='button_row'>
              <Button onClick={() => setCount((count) => count - 1)}>Previous Step</Button>
              <Button onClick={() => setCount((count) => count + 1)}>Next Step</Button>
              <Button onClick={() => setCount(() => 100)}>Fast Forward</Button>
              <Button onClick={() => setCount(() => 0)}>Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
