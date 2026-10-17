import { describe, expect, it } from "vitest";
import { agentTrace } from "../content/agents";
import { TRACE_DURATION_MS, traceCursorAt } from "./trace";

describe("agent trace timing", () => {
  it("waits before writing and stops at the last line", () => {
    expect(traceCursorAt(0)).toBe(0);
    expect(traceCursorAt(TRACE_DURATION_MS * 10)).toBe(agentTrace.length);
  });

  it("advances monotonically through every line", () => {
    let previous = 0;
    for (let t = 0; t <= TRACE_DURATION_MS + 1000; t += 50) {
      const cursor = traceCursorAt(t);
      expect(cursor).toBeGreaterThanOrEqual(previous);
      previous = cursor;
    }
  });
});
