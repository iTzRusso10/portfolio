/**
 * Splits the plain text of a reveal block into words that jump into place,
 * so every piece of text on the page shares the titles' entrance.
 *
 * Only text that React never changes after mount is split; anything animated
 * by its own code or updated live is skipped (see SKIP). Words keep their
 * spaces as text nodes, so the text reads the same to assistive tech.
 */

const SKIP = [
  "[data-no-jump]",
  "[aria-live]",
  "[data-reveal='jump']",
  "[data-reveal='tokens']",
  ".typed",
  ".caret",
  ".sr-only",
  "canvas",
  "svg",
  "script",
  "style",
].join(",");

/** Words after this index share the last delay, so long panels don't drag. */
export const MAX_WORD_INDEX = 36;

export function jumpWordIndex(index: number) {
  return Math.min(index, MAX_WORD_INDEX);
}

/** Wraps the words of `root`'s own text (not of nested reveal blocks) in `.jw` spans. */
export function jumpify(root: HTMLElement) {
  if (root.dataset.jumpified) return;
  root.dataset.jumpified = "true";

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest(SKIP)) return NodeFilter.FILTER_REJECT;
      // Text of a nested reveal block is that block's job.
      if (parent.closest("[data-reveal]") !== root) return NodeFilter.FILTER_REJECT;
      // In a flex or grid container each word would become an item and take the gap.
      if (/flex|grid/.test(getComputedStyle(parent).display)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  let index = 0;
  for (const node of nodes) {
    const parts = node.nodeValue!.split(/(\s+)/);
    const fragment = document.createDocumentFragment();
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        fragment.append(part);
        continue;
      }
      const word = document.createElement("span");
      word.className = "jw";
      word.style.setProperty("--i", String(jumpWordIndex(index++)));
      word.textContent = part;
      fragment.append(word);
    }
    node.replaceWith(fragment);
  }
}

/** Starts the jump of the words that belong to `root`. */
export function startWords(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".jw").forEach((word) => {
    if (word.parentElement?.closest("[data-reveal]") === root) word.classList.add("jw-on");
  });
}
