"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { ReactElement } from "react";

import { CodeEntry } from "./lib/codeData";
import './ComplexityChart.css'

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
      strokeWidth={4}
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
    <Card className="chart_card"> 
      <CardHeader>
        <CardTitle>Time Complexity</CardTitle>
      </CardHeader>

      <CardContent className="graph_container">
        <p className="y_axis">Operations</p>
        <ChartContainer className="chart" config={getChartConfig(props.lines)}>
          <LineChart
            accessibilityLayer
            data={simulateData(props.n, props.lines)}>
            <CartesianGrid vertical={true} />
            <XAxis/>
            <YAxis/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} labelFormatter={() => "Operations"}/>
            {generateLines(props.lines)}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardContent>
        <p style={{textAlign: "center"}}>N (Array Size)</p>
      </CardContent>
    </Card>
  )
}
