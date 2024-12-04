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

    constructor(list: FlowGuideEntry[]) {
        this.entries = list;
    }

    reset() {
        this.index = 0;
        this.entries.forEach(entry => {
            entry.reset();
        })
    }

    tick(): number {
        this.index = this.entries[this.index].nextIndex(this.index);
        return this.index;
    }

    tickToIndex(index: number): number {
        this.reset()
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

    reset() {}
}

class FlowGuidePointer extends FlowGuideEntry {
    count: number = 0;
    maxCount: number;
    targetIndex: number;

    // todo: make maxCount be based on the function what gives the number of evaluations
    constructor(targetIndex: number, maxCount: number) {
        super();
        this.targetIndex = targetIndex;
        this.maxCount = maxCount;
    }

    reset() {
        this.count = 0;
    }

    nextIndex(i: number): number {
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
        print(i)`,
    flowGuide: new FlowGuide([
        new FlowGuideEntry,
        new FlowGuideEntry,
        new FlowGuidePointer(1, 100)
    ]),
    operations_per_n: linear
}
/** ≈
function squared(n: number) {
    return n ** 2
}

export const SQUARED: CodeEntry = {
    name: "Squared",
    color: "hsl(var(--chart-2))",
    code: `This
    is
    a
        test
    yay!`,
    operations_per_n: squared
}

function constant(n: number) {
    return 1
}

export const CONSTANT: CodeEntry = {
    name: "O(1)",
    color: "hsl(var(--chart-3))",
    code: `This
    is
    a
        test
    yay!`,
    operations_per_n: constant
}

*/