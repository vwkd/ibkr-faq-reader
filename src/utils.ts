import type { Entries, Entry, NoEntries } from "./types.ts";

/**
 * Checks if is entries
 *
 * @param entries entries or no entries
 * @returns `true` if entries, `false` otherwise
 */
export function isEntries(entries: Entries | NoEntries): entries is Entries {
  if ((entries as NoEntries).empty_result) {
    return false;
  }

  return true;
}

/**
 * Checks if is entry
 *
 * @param entry entry or empty object
 * @returns `true` if entry, `false` otherwise
 */
export function isEntry(
  entry: Entry | Record<string | number | symbol, never>,
): entry is Entry {
  if ((entry as Entry).question) {
    return true;
  }

  return false;
}
