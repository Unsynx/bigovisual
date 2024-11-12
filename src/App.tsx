import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GraphBigO } from './GraphBigO'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container_side'>
        <div className='side_left'>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <div className='side_right'>
          <div className='graph'>
            <GraphBigO />
          </div>
          <div className='control'>
            <p>Current Step: {count}</p>
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
