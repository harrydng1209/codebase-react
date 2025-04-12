import type { TObjectString } from '@/models/types/shared.type';

import { ELanguageCode } from '@/models/enums/shared.enum';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

type TLocales = Record<string, { default: TObjectString }>;
type TResources = Record<ELanguageCode, Record<string, TObjectString>>;

const locales: TLocales = import.meta.glob('../../locales/**/*.json', {
  eager: true,
});

const resources: TResources = Object.values(ELanguageCode).reduce(
  (acc, lang) => {
    acc[lang] = { translation: {} };
    return acc;
  },
  {} as TResources,
);

Object.keys(locales).forEach((path) => {
  const match = path.match(/\/locales\/(.*?)\.json$/);

  if (!match || !match[1]) return;

  const locale = match[1] as ELanguageCode;
  const data = locales[path].default;

  if (!Object.values(ELanguageCode).includes(locale)) return;

  if (!resources[locale]) resources[locale] = { translation: {} };

  Object.assign(resources[locale].translation, data);
});

i18next.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  lng: ELanguageCode.English,
  resources,
});

export default i18next;
