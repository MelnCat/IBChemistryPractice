const subscripts = `₀₁₂₃₄₅₆₇₈₉`;
const subscriptChar = (c: string) => c === "." ? "•" : c.match(/\d/) && +c <= 9 ? subscripts[+c] : c;
export const subscript = (s: string) => s.split("").map(x => subscriptChar(x)).join("");
export const sample = <T>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
export const roman = (n: number) => [
    "0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"][n]