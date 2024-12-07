import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ComplexityChart } from './ComplexityChart'
import { CodeBlock } from './CodeBlock'
import { LINEAR, CONSTANT, SQUARED } from "./lib/codeData";
import './App.css'
import { Card } from './components/ui/card';

function App() {
  const [count, setCount] = useState(0),
        [ticking, setTicking] = useState(false),
        [tick, setTick] = useState(0),
        [tickSpeed, setTickSpeed] = useState(1e2);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ticking) { return; }

      setTick(tick + 1)

      if (tickSpeed === 0) {
        setCount(count + 1)
      }

      if (SQUARED.operations_per_n(count) < tick) {
        setCount(count + 1)
        setTick(0)
      }

    }, tickSpeed);
    return () => clearTimeout(timer);
  }, [tick, ticking]);

  function reset() {
    setTicking(false); 
    setTick(0);
    setCount(0);
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
            <div className='button_row'>
              <Button onClick={() => setTicking(() => true)} >Run</Button>
              <Button onClick={() => setTicking(() => false)}>Pause</Button>
              <Button onClick={() => reset()}>Reset</Button>
              <div style={{width: 100}}/>
              <Slider defaultValue={[1e2]} max={150} step={1} className='speed_slider' onValueChange={(value) => setTickSpeed(value[0])}/>
              <p className='tick_speed_data'>{tickSpeed}ms / operation</p>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default App
