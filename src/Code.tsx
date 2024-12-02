import { Card, CardContent, CardHeader } from "@/components/ui/card"
import './Code.css'
import './index.css'
import { ReactElement } from "react";


var text =
`function PrimeCheck(candidate){
    isPrime = true;
    for(var i = 2; i < candidate && isPrime; i++){
        if(candidate%i === 0){
            isPrime = false;
        } else {
            isPrime = true;
        }
    }
}`
var lineCount = text.split('\n').length

function parseCode(nth: number) {
    var result: ReactElement[] = []
    var lines = text.split('\n')
    for (var i = 0; i < lines.length; i++) {
        result.push(
        <div className="code_row">
            <p className={`code_row_num ${i + 1 === nth ? 'highlight' : ''}`}>{i}</p>
            <pre>{lines[i]}</pre>
        </div>
        )
    }
    return result;
}

interface CodeData {
    tick: number;
}

// todo: add line number indicators and fix the styling.
export function Code(props:CodeData) {
  return (
    <Card>
        <CardHeader>Code Block</CardHeader>
        <CardContent className="code_body">
            <div className="sub_body">
                <div>{parseCode(props.tick)}</div>
            </div>
        </CardContent>
    </Card>
  )
}
