/** Keyword markup of the copy: `*word*` is the highlighted word of a line. */

export interface MarkedWord {
  chars: { char: string; mark: boolean }[];
  mark: boolean;
}

/** Splits a line into words, remembering which characters sit between asterisks. */
export function parseMarks(line: string): MarkedWord[] {
  const words: MarkedWord[] = [];
  let current: MarkedWord = { chars: [], mark: false };
  let mark = false;
  for (const char of line) {
    if (char === "*") {
      mark = !mark;
      continue;
    }
    if (char === " ") {
      if (current.chars.length) words.push(current);
      current = { chars: [], mark: false };
      continue;
    }
    current.chars.push({ char, mark });
    current.mark ||= mark;
  }
  if (current.chars.length) words.push(current);
  return words;
}

export const plainText = (lines: readonly string[]) => lines.join(" ").replace(/\*/g, "");

