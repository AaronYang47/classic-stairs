export const SITE = {
  name: "Luxe Stairs",
  email: "info@luxestairs.com",
  phoneDisplay: "1-800-555-1234",
  phoneTel: "+18005551234",
  addressLine1: "123 Architectural Way",
  addressLine2: "New York, NY 10001",
  hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://x.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

/** sessionStorage key for quote → contact handoff */
export const QUOTE_DRAFT_STORAGE_KEY = "luxeStairs_quoteDraft_v1";
