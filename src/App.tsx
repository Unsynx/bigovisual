import { useState, useEffect } from 'react'
import { ReactElement } from "react";

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from './components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ComplexityChart } from './ComplexityChart'
import { CodeBlock } from './CodeBlock'
import './App.css'

import { CODE_ENTRY_OPTIONS, EXPONENTIAL, CodeEntry } from "./lib/codeData";

function setUpDropDown() {
  var result: ReactElement[] = [];
  for (const [key, _] of Object.entries(CODE_ENTRY_OPTIONS)) {
    result.push(
      <SelectItem value={key}>{key}</SelectItem>
    )
  }
  return result
}

function renderEntries(count: number, tick: number, entries: CodeEntry[]) {
  var result: ReactElement[] = [];
  for (const [_, value] of Object.entries(entries)) {
    result.push(
      <CodeBlock n={count} tick={tick} codeData={value}></CodeBlock>
    )
  }
  return result
}

function App() {
  const [count, setCount] = useState(0),
        [ticking, setTicking] = useState(false),
        [tick, setTick] = useState(0),
        [tickSpeed, setTickSpeed] = useState(1e2),
        [entries, setEntries] = useState<CodeEntry[]>([]),
        [selectedEntry, setSelectedEntry] = useState<string>();

  function getCodeEntry(name: string) {
    return CODE_ENTRY_OPTIONS[name];
  }

  function addEntry(name: string | undefined) {
    if (name === undefined) { return; }
    const entry = getCodeEntry(name);
    if (entries.includes(entry)) { return; }
    setEntries([...entries, entry])
  }

  function removeEntry(name: string | undefined) {
    if (name === undefined) { return; }
    const entry = getCodeEntry(name);
    if (entries.includes(entry)) {
      const index = entries.indexOf(entry)
      // Create a new array excluding the item at the specified index
      const copy = [...entries.slice(0, index), ...entries.slice(index + 1)];
      setEntries(copy)
    }
  }

  function getLargestOperationsPerN(): number {
    var max = 0;
    entries.forEach((entry) => {
      var n = entry.operations_per_n(count);
      if (n > max) { max = n} 
    })
    return max
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ticking) { return; } // pause the simulation

      setTick(tick + 1)

      if (tickSpeed === 0) { setCount(count + 1) }

      if (getLargestOperationsPerN() < tick) {
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
          <Card className='code_block_controls'>
            <Button onClick={() => addEntry(selectedEntry)}>Add</Button>
            <Button style={{marginLeft: "0.2em"}} onClick={() => removeEntry(selectedEntry)}>Remove</Button>
            <Select onValueChange={(value) => {setSelectedEntry(value)}}>
              <SelectTrigger className="selection">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>{setUpDropDown()}</SelectContent>
            </Select>
          </Card>
          {renderEntries(count, tick, entries)}
        </div>
        <div className='side_right'>
          <div className='graph'>
            <ComplexityChart n={count} lines={entries} />
          </div>
          <Card className='control'>
            <div className='button_row'>
              <Button onClick={() => setTicking(() => true)} >Run</Button>
              <Button onClick={() => setTicking(() => false)}>Pause</Button>
              <Button onClick={() => reset()}>Reset</Button>
              <div style={{width: 200}}/>
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
