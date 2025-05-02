import ru from '../../messeges/ru.json';
import tj from '../../messeges/tj.json';

type TranslationObject = {
  [key: string]: string; 
};

export const translations: Record<'ru' | 'tj', TranslationObject> = {
  ru,
  tj,
};

export type Locale = keyof typeof translations;

export const getTranslation = (locale: Locale, key: string) => {
  return translations[locale][key] || key;
};
