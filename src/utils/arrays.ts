export function hasCommonItems(array1: string[], array2: string[]): boolean {
    return array2.some(item => array1.includes(item));
}

export function removeCommonItems(array1: string[], array2: string[]): any[] {
    return array1.filter(item => !array2.includes(item));
}

export function extractCommonItems(array1: string[], array2: string[]): any[] {
    return array1.filter(item => array2.includes(item));
}
