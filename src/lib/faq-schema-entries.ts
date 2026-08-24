/**
 * English FAQ entries for JSON-LD — must match visible FAQ copy (en locale).
 * Keeps FAQ rich results / LLM citations aligned with on-page answers.
 */
import { en } from '@/lib/i18n/locales/en';
import { HOME_FAQ_PREVIEW_COUNT, getFullFaqI18nItems } from '@/lib/faq-i18n-items';

export type FaqSchemaEntry = { question: string; answer: string };

function entryFromKeys(questionKey: string, answerKey: string): FaqSchemaEntry {
  return {
    question: en[questionKey] || questionKey,
    answer: en[answerKey] || answerKey,
  };
}

/** Homepage FAQ accordion (preview items only). */
export function getHomeFaqSchemaEntries(): FaqSchemaEntry[] {
  return Array.from({ length: HOME_FAQ_PREVIEW_COUNT }, (_, index) => {
    const i = index + 1;
    return entryFromKeys(`homeFaq.fallback${i}Q`, `homeFaq.fallback${i}A`);
  });
}

/** Full /faq page = home FAQs + supplemental. */
export function getFullFaqSchemaEntries(): FaqSchemaEntry[] {
  return getFullFaqI18nItems().map((item) =>
    entryFromKeys(item.questionKey, item.answerKey)
  );
}

export function getPricingFaqSchemaEntries(): FaqSchemaEntry[] {
  return [1, 2, 3].map((i) => entryFromKeys(`pricing.faq${i}Q`, `pricing.faq${i}A`));
}

export function getSubmitAppFaqSchemaEntries(): FaqSchemaEntry[] {
  return [1, 2, 3, 4, 5].map((i) =>
    entryFromKeys(`submitApp.faq${i}Q`, `submitApp.faq${i}A`)
  );
}

export function getCompareFaqSchemaEntries(): FaqSchemaEntry[] {
  return [1, 2, 3, 4, 5, 6].map((i) =>
    entryFromKeys(`compare.faq${i}Q`, `compare.faq${i}A`)
  );
}

export function getHowItWorksFaqSchemaEntries(): FaqSchemaEntry[] {
  return [1, 2, 3, 4, 5, 6].map((i) =>
    entryFromKeys(`howItWorks.faq${i}Q`, `howItWorks.faq${i}A`)
  );
}
