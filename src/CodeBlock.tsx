import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { ReactElement } from "react";
import { CodeEntry } from "./lib/codeData";

import './CodeBlock.css'
import './index.css'


function parseCode(highlightedIndex: number, text: string, color: string) {
    var result: ReactElement[] = []
    var lines = text.split('\n')
    for (var i = 0; i < lines.length; i++) {
        var backgroundColor = i % 2 == 0 ? "dark" : "light";
        var style = i === highlightedIndex ? {background: color} : {};
        
        result.push(<>
            <p className={`code_index ${i === highlightedIndex ? 'highlight' : ''}`} style={style}>{i}</p>
            <pre className={`code_line ${backgroundColor}`}>{lines[i]}</pre>
        </>)
    }
    return result;
}

function isDone(operations: number, maxOperations: number) {
    if (operations > maxOperations) {
        return (
            <div className="done_label">
                <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                <p>Done</p>
            </div>
        )
    }
}


interface CodeBlockProps {
    tick: number;
    n: number;
    codeData: CodeEntry
}

export function CodeBlock(props:CodeBlockProps) {
  return (
    <Card className="code_card">
        <CardHeader className="code_header" style={{background: props.codeData.color}}>
            <p className="code_title">{props.codeData.name}</p>
            {isDone(props.tick, props.codeData.operations_per_n(props.n))}
        </CardHeader>
        <CardContent className="code_body">
            <div className="sub_body">
                {parseCode(props.codeData.flowGuide.tickToIndex(props.tick, props.n), props.codeData.code, props.codeData.color)}
            </div>
        </CardContent>
        <CardFooter>
            <p>N = {props.n} | Operations = {props.codeData.flowGuide.operations}</p>
        </CardFooter>
    </Card>
  )
}
