import { getEntries } from "./get.ts";
import { parseEntries } from "./parse.ts";

const [id, path] = Deno.args;

if (!id) {
  throw new Error(`Missing entries id argument`);
}

if (!path) {
  throw new Error(`Missing output path argument`);
}

const entries = await getEntries(id);

const entriesNew = await parseEntries(entries);

const markdown = entriesNew.entries.reduce((acc, { question, answer }) => {
  return `${acc}\n\n## ${question}\n\n${answer}`;
}, `# ${entriesNew.title}`);

await Deno.writeTextFile(path, markdown);
