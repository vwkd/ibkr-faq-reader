export interface Entries extends BaseEntries {
  topic: string;
  show_more: boolean;
  show_more_context: ShowMoreContext;
  last_index: number;
  questions: Question[];
}

export interface NoEntries extends BaseEntries {
  empty_result: true;
  show_more: false;
  last_index: 0;
}

export interface BaseEntries {
  "@type": "FAQ_BROWSER_QUESTIONS";
  server_version: string;
  session_id: string;
}

export interface ShowMoreContext {
  has_more: boolean;
  feedback_context: ShowMoreFeedbackContext;
}

export interface ShowMoreFeedbackContext {
  request_context: string;
  type: "FAQ_SHOW_MORE";
  id: string;
  timestamp: number;
  cir_id: string;
}

export interface Question {
  id: string;
  title: string;
  feedback_context: FeedbackContext<"FAQ_QUESTION">;
}

export interface FeedbackContext<
  T extends "FAQ_QUESTION" | "FAQ_SIMILAR" | "FAQ_NAVIGATION" | "FAQ_CONTENT",
> {
  request_context: string;
  type: T;
  id: string;
  faq_id: string;
  timestamp: number;
  cir_id: string;
}

export interface Entry {
  "@type": "FAQ_BROWSER_CONTENT";
  server_version: string;
  session_id: string;
  id: string;
  /** is title? */
  question: string;
  /** is markdown content? */
  answer: string;
  navigation: Navigation[];
  similars: EntrySimilar[];
  feedback_context: FeedbackContext<"FAQ_CONTENT">;
}

export interface Navigation {
  id: string;
  title: string;
  feedback_context: FeedbackContext<"FAQ_NAVIGATION">;
}

export interface EntrySimilar {
  id: string;
  title: string;
  feedback_context: FeedbackContext<"FAQ_SIMILAR">;
  source: Source;
}

export interface Source {
  id: "faq";
  title: "IBKR FAQs";
  link: string;
  sourceType: "FAQ";
}

export interface EntriesSimple {
  title: string;
  entries: EntrySimple[];
}

export interface EntrySimple {
  question: string;
  answer: string;
}
