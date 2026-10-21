/**
 * A visitor's own, unsaved token changes from the design system page.
 *
 * Kept in memory only: the changes follow the visitor around the site while
 * they browse (client-side navigation keeps this module alive), and vanish as
 * soon as they reload or leave, so the site "refreshes" for them.
 * The live look comes from the CSS variables set on <html>; this store
 * remembers which ones were changed so the editor and the reset pill can find them.
 */
const changes = new Map<string, string>();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const visitorTokens = {
  entries: () => Object.fromEntries(changes),
  size: () => changes.size,
  set(name: string, value: string) {
    changes.set(name, value);
    emit();
  },
  delete(name: string) {
    if (changes.delete(name)) emit();
  },
  /** Drops every change and puts the site's own values back. */
  reset() {
    for (const name of changes.keys()) document.documentElement.style.removeProperty(name);
    changes.clear();
    emit();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
