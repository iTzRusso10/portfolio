import { agentTrace } from "../content/agents";
import { clamp } from "../utils/math";

/** How long a full run of the agent trace takes once it comes into view. */
export const TRACE_DURATION_MS = 7200;
/** Short pause before the first line, so the panel is seen empty for a moment. */
const TRACE_DELAY_MS = 500;

/** Continuous cursor through the trace: 2.5 means lines 0-1 are done and line 2 is half written. */
export function traceCursorAt(elapsedMs: number) {
  return clamp((elapsedMs - TRACE_DELAY_MS) / TRACE_DURATION_MS) * agentTrace.length;
}
