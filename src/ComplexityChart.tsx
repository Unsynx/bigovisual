"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ReactElement } from "react";

import { CodeEntry } from "./lib/codeData";

interface DataPoint {
  n: number,
  [key: string]: number // This is the operations per n
}

function simulateData(n: number, entires: CodeEntry[]) {
  var chartData: DataPoint[] = []
  for (var i = 0; i < n; i++) {
    // Create a data point
    var dataPoint: DataPoint = { n: i }
    entires.forEach(entry => {
      dataPoint[entry.name] = entry.operations_per_n(i)
    })
    chartData.push(dataPoint)
  }
  return chartData
}

function getChartConfig(entries: CodeEntry[]) {
  var chartConfig: ChartConfig = {}
  entries.forEach(entry => {
    chartConfig[entry.name] = {
      label: entry.name,
      color: entry.color
    }
  })
  return chartConfig
}

function generateLines(entries: CodeEntry[]) {
  var result: ReactElement<Line>[] = []
  entries.forEach(entry => {
    result.push(
    <Line 
      dataKey={entry.name}
      type="monotone"
      stroke={entry.color}
      strokeWidth={2}
      dot={false}
    />)
  });
  return result
}

interface ComplexityChartProps {
  n: number,
  lines: CodeEntry[]
}

export function ComplexityChart(props:ComplexityChartProps) {
  return (
    <Card style={{ height: '100%' }}> 
      <CardHeader>
        <CardTitle>Time Complexity</CardTitle>
      </CardHeader>
      <CardContent>

        <ChartContainer config={getChartConfig(props.lines)} style={{minHeight: 300}}>
          <LineChart
            accessibilityLayer
            data={simulateData(props.n, props.lines)}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="number"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {generateLines(props.lines)}
          </LineChart>
        </ChartContainer>

      </CardContent>
    </Card>
  )
}
