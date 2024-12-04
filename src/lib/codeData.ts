export interface CodeEntry {
    name: string,
    color: string,
    code: string,
    operations_per_n: Function
}

function linear(n: number) {
    return n
}

export const LINEAR: CodeEntry = {
    name: "Linear",
    color: "hsl(var(--chart-1))",
    code: `This
    is
    a
        test
    yay!`,
    operations_per_n: linear
}

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