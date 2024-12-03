export interface CodeEntry {
    name: string,
    color: string,
    code: string,
    operations_per_n: number
}

export const LINEAR: CodeEntry = {
    name: "Linear",
    color: "red",
    code: `This
    is
    a
        test
    yay!`,
    operations_per_n: 1
}