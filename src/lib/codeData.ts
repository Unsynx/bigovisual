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

    reset(n?: number) {}
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
    name: "Linear",
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


var pointer = new FlowGuidePointer(2, linear)
export const SQUARED: CodeEntry = {
    name: "Squared",
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
    return 1
}

export const CONSTANT: CodeEntry = {
    name: "O(1)",
    color: "hsl(var(--chart-3))",
    code: `def func(n):
    print()`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry
    ]),
    operations_per_n: constant
}
