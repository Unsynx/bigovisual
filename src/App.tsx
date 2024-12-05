import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ComplexityChart } from './ComplexityChart'
import { CodeBlock } from './CodeBlock'
import { LINEAR, CONSTANT, SQUARED } from "./lib/codeData";
import './App.css'
import { Card } from './components/ui/card';

function App() {
  const [count, setCount] = useState(5),
        [ticking, setTicking] = useState(false),
        [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setTick(tick + 1), 1e2);
    return () => clearTimeout(timer);
  }, [tick, ticking]);

  function reset() {
    setTicking(false); 
    setTick(0);
  }

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
          <Card className='control'>
            <p>N: {count} Tick: {tick}</p>
            <div className='button_row'>
              <Button onClick={() => {setCount((count) => count - 1); reset()}} variant="secondary">-1 N</Button>
              <Button onClick={() => {setCount((count) => count + 1); reset()}} variant="secondary">+1 N</Button>
              <Button onClick={() => {setCount((count) => count - 10); reset()}} variant="secondary">-10 N</Button>
              <Button onClick={() => {setCount((count) => count + 10); reset()}} variant="secondary">+10 N</Button>
              <div style={{width: "2em"}}/>
              <Button onClick={() => setTicking(() => true)} >Run</Button>
              <Button onClick={() => reset()}>Reset</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default App
