export interface CodeEntry {
    name: string,
    color: string,
    code: string,
    flowGuide: FlowGuide,
    operations_per_n: Function
}

class FlowGuide {
    entries: FlowGuideEntry[];
    index: number = 0;
    operations: number = 0;

    constructor(list: FlowGuideEntry[]) {
        this.entries = list;
    }

    reset(n: number) {
        this.index = 0;
        this.operations = 0;
        this.entries.forEach(entry => {
            entry.reset(n);
        })
    }

    tick(): number {
        if (this.index >= this.entries.length) {
            return this.index + 1;
        }

        this.operations++;
        this.index = this.entries[this.index].nextIndex(this.index);
        return this.index;
    }

    tickToIndex(index: number, n: number): number {
        this.reset(n)
        for (var i = 0; i < index; i++) {
            this.tick()
        }
        return this.index;
    }
}

class FlowGuideEntry {
    nextIndex(i: number): number {
        return i + 1;
    }

    reset(n?: number) { n; }
}

class FlowGuidePointer extends FlowGuideEntry {
    count: number = 0;
    maxCount: number = 0;
    maxCountFunction: Function;
    targetIndex: number;
    resetOnTick: FlowGuideEntry[];

    constructor(targetIndex: number, maxCountFunction: Function, restEntires?: FlowGuideEntry[]) {
        super()

        if (typeof restEntires == "undefined") {
            this.resetOnTick = [];
        } else {
            this.resetOnTick = restEntires;
        }

        this.targetIndex = targetIndex;
        this.maxCountFunction = maxCountFunction;
        
    }

    setMaxCount(n?: number) {
        if (typeof n == "undefined" ) {
            return
        }

        this.maxCount = this.maxCountFunction(n);
    }

    reset(n: number) {
        this.setMaxCount(n)
        this.count = 0;
    }

    nextIndex(i: number): number {
        this.resetOnTick.forEach(entry => {
            entry.reset()
        })

        if (this.count < this.maxCount) {
            this.count++;
            return this.targetIndex;
        } else {
            return i + 1;
        }
    }
}

function linear(n: number) {
    return n
}

export const LINEAR: CodeEntry = {
    name: "Linear - O(n)",
    color: "hsl(var(--chart-1))",
    code: `def func(n):
    for i in range(n):
        print()`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry,
        new FlowGuidePointer(1, linear)
    ]),
    operations_per_n: linear
}

function squared(n: number) {
    return n ** 2
}


const pointer = new FlowGuidePointer(2, linear)
export const QUADRATIC: CodeEntry = {
    name: "Quadratic - O(n^2)",
    color: "hsl(var(--chart-2))",
    code: `def func(n):
    for i in range(n):
        for j in range(n):
            print()`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry,
        new FlowGuideEntry,
        pointer,
        new FlowGuidePointer(1, linear, [pointer])
    ]),
    operations_per_n: squared
}

function constant(n: number) {
    n;
    return 1
}

export const CONSTANT: CodeEntry = {
    name: "Constant - O(1)",
    color: "hsl(var(--chart-3))",
    code: `def func(n):
    print()`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry
    ]),
    operations_per_n: constant
}

function exponential(n: number) {
    return 2 ** n
}

export const EXPONENTIAL: CodeEntry = {
    name: "Exponential - O(2^n)",
    color: "hsl(var(--chart-4))",
    code: `def func(n):
    for i in range(2**n):
        print()`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry,
        new FlowGuidePointer(1, exponential)
    ]),
    operations_per_n: exponential
}

// The log CodeEntry causes then graph to stop working
function log(n: number) {
    return Math.ceil(Math.log10(n))
}

export const LOG: CodeEntry = {
    name: "Logarithmic - O(log2(n))",
    color: "hsl(var(--chart-5))",
    code: `def func(n):
    for i in range(Math.log2(n)):
        print()`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry,
        new FlowGuidePointer(1, log)
    ]),
    operations_per_n: log
}

export const CODE_ENTRY_OPTIONS: { [key: string]: CodeEntry } = {
    Exponential: EXPONENTIAL,
    Constant: CONSTANT,
    Quadratic: QUADRATIC,
    Linear: LINEAR
}