"use client"

import { TrendingUp } from "lucide-react"
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
import { Console } from "console"

interface DataPoint {
  n: number,
  execution_time_a: number,
  execution_time_b: number
}

var chartData: DataPoint[] = []

function populateData(n: number) {
  chartData = []
  for (var i = 0; i < n; i++) {
    chartData.push( {
      n: i,
      execution_time_a: i,
      execution_time_b: i ** 2
    })
  }
  console.log(chartData)
}

const chartConfig = {
  desktop: {
    label: "execution_time_a",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "execution_time_b",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface Props {
  n: number
}

export function GraphBigO(props:Props) {
  populateData(props.n)
  return (
    
    <Card style={{ height: '100%' }}>
      
      <CardHeader>
        <CardTitle>Time Complexity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{minHeight: 300}}>
          <LineChart
            accessibilityLayer
            data={chartData}
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
            <Line
              dataKey="execution_time_a"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="execution_time_b"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
