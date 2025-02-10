export function extractFromObject<T>(array: string[], obj: Partial<T>): Partial<T> {
    return array.reduce((acc, key) => {
        if (key in obj) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
