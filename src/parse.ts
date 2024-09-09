import { getEntry } from "./get.ts";
import type { Entries, EntriesSimple } from "./types.ts";

/**
 * Parse entries
 *
 * @param entries entries
 * @returns parsed entries
 */
export async function parseEntries(entries: Entries): Promise<EntriesSimple> {
  const { topic, questions, show_more_context } = entries;

  if (show_more_context.has_more) {
    console.warn(`Skipping more entries since pagination not yet implemented`);
  }

  const entriesNew: EntriesSimple = {
    title: topic,
    entries: [],
  };

  for (const { title, feedback_context: { faq_id } } of questions) {
    const entry = await getEntry(faq_id);

    const { question, answer } = entry;

    if (title !== question) {
      throw new Error(`Title "${title}" does not match question "${question}"`);
    }

    entriesNew.entries.push({
      question,
      answer,
    });
  }

  return entriesNew;
}
