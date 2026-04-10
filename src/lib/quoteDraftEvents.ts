export const QUOTE_DRAFT_EVENT = "luxeStairs:quoteDraft";

export function notifyQuoteDraftUpdated() {
  window.dispatchEvent(new CustomEvent(QUOTE_DRAFT_EVENT));
}
