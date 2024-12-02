import { Card, CardContent, CardHeader } from "@/components/ui/card"
import './Code.css'
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

function parseCode() {
    var result: ReactElement[] = []
    text.split('\n').forEach(line => {
        result.push(<pre className="code_row">{line}</pre>)
    });
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
            <div className="code_indicator_column">
                <div className="indicator"
                style={{marginTop: (props.tick % lineCount) * 24}}
                />
            </div>
            <div>{parseCode()}</div>
        </CardContent>
    </Card>
  )
}
