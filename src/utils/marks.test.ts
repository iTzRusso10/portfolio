import { describe, expect, it } from "vitest";
import { parseMarks, plainText } from "./marks";

const text = (line: string) => parseMarks(line).map((w) => w.chars.map((c) => c.char).join(""));

describe("keyword marks", () => {
  it("splits words and drops the asterisks", () => {
    expect(text("Il tuo *gestionale*.")).toEqual(["Il", "tuo", "gestionale."]);
  });

  it("marks only the characters between asterisks", () => {
    const [word] = parseMarks("*250 €*!").slice(-1);
    expect(word?.mark).toBe(true);
    expect(word?.chars.map((c) => c.mark)).toEqual([true, false]);
    expect(parseMarks("*250 €*!")[0]?.chars.every((c) => c.mark)).toBe(true);
  });

  it("keeps a mark open across words", () => {
    expect(parseMarks("*tutto in un posto*.").map((w) => w.mark)).toEqual([true, true, true, true]);
    expect(parseMarks("a *b* c").map((w) => w.mark)).toEqual([false, true, false]);
  });

  it("reads as plain text", () => {
    expect(plainText(["Un sito a", "*250 €*."])).toBe("Un sito a 250 €.");
  });
});
