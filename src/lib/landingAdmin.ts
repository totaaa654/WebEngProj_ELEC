import { landingPageData, type LandingPageData } from "../data/landing";

export type LandingEditableContent = LandingPageData;

const STORAGE_KEY = "landing-admin";
const DRAFT_KEY = "landing-admin-draft";

export function loadLandingOverrides(): LandingEditableContent | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as LandingEditableContent;
  } catch {
    return null;
  }
}

export function saveLandingOverrides(content: LandingEditableContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function clearLandingOverrides() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function loadLandingDraft(): LandingEditableContent | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as LandingEditableContent;
  } catch {
    return null;
  }
}

export function saveLandingDraft(content: LandingEditableContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
}

export function clearLandingDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

export function mergeLandingWithOverrides(base: LandingPageData): LandingPageData {
  const overrides = loadLandingOverrides();
  if (!overrides) return base;

  return {
    ...base,
    ...overrides,
    hero: { ...base.hero, ...overrides.hero },
    sections: {
      ...base.sections,
      ...overrides.sections,
    },
  };
}

export function getLandingDefaults(): LandingEditableContent {
  return landingPageData;
}
