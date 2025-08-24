import languages from './locales/languages.json';
import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';
import tetTranslations from './locales/tet.json';

export type Language = 'en' | 'pt' | 'tet';

export const LANGUAGES = languages as Record<Language, string>;

export const DEFAULT_LANGUAGE: Language = 'en';

const translations = {
  en: enTranslations,
  pt: ptTranslations,
  tet: tetTranslations,
};

export type TranslationKey = keyof typeof enTranslations;

export function getTranslations(language: Language) {
  return translations[language] || translations[DEFAULT_LANGUAGE];
}

export function getNestedTranslation(
  translations: any,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof result === 'string' ? result : fallback || key;
}