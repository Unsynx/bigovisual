import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { ReactElement } from "react";
import { CodeEntry } from "./lib/codeData";

import './CodeBlock.css'
import './index.css'


function parseCode(highlightedIndex: number, text: string, color: string) {
    var result: ReactElement[] = []
    var lines = text.split('\n')
    for (var i = 0; i < lines.length; i++) {
        var style = i === highlightedIndex ? {background: color} : {}
        result.push(
        <div className="code_row">
            <p className={`code_row_num ${i === highlightedIndex ? 'highlight' : ''}`} style={style}>{i}</p>
            <pre className="code_line">{lines[i]}</pre>
        </div>
        )
    }
    return result;
}


interface CodeBlockProps {
    tick: number;
    n: number;
    codeData: CodeEntry
}

export function CodeBlock(props:CodeBlockProps) {
  return (
    <Card>
        <CardHeader>{props.codeData.name}</CardHeader>
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
