import type { Entries, Entry, NoEntries } from "./types.ts";
import { isEntries, isEntry } from "./utils.ts";

// todo: figure out maximum that API allows
const MAX_SIZE = 999;
const ENTRY_URL = `https://www.interactivebrokers.com/tws.proxy/faq/content`;

/**
 * Get entries from API
 *
 * @param id id of entries, e.g. `12345678`
 * @returns entries
 */
export async function getEntries(id: string): Promise<Entries> {
  const LIST_URL =
    `https://www.interactivebrokers.com/tws.proxy/faq/articles/${id}?size=${MAX_SIZE}`;

  console.info(`Getting entries with ID '${id}'`);

  const res = await fetch(LIST_URL);

  if (!res.ok) {
    throw new Error(`Got error ${res.status} ${res.statusText}`);
  }

  const entries: Entries | NoEntries = await res.json();

  if (!isEntries(entries)) {
    throw new Error(`No entries found. Is the ID correct?`);
  }

  return entries;
}

/**
 * Get entry from API
 *
 * @param id id of entry, e.g. `faq://pageId=12345678`
 */
export async function getEntry(id: string): Promise<Entry> {
  console.info(`Getting entry with ID '${id}'`);

  const body = {
    "features": {
      "FAQ_GEN_AI": 1,
      "SHOW_BOT3_GLOBAL_SEARCH": 1,
      "SHOW_GEN_AI_GLOBAL_SEARCH": 1,
      "SHOW_MADCAP": 1,
      "FAQ_USE_HYBRID_SEARCH": "1",
      "FAQ_USE_MULTI_CONTEXT_IBOT": "1",
    },
    "question_id": id,
  };

  const res = await fetch(ENTRY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Got error ${res.status} ${res.statusText}`);
  }

  const entry: Entry | Record<string | number | symbol, never> = await res
    .json();

  if (!isEntry(entry)) {
    throw new Error(`No entry found. Is the ID correct?`);
  }

  return entry;
}
