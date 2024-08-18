// components/LanguageUtils.ts
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

export const initI18n = async (supportedLanguages: string[]) => {
  const loadTranslation = async (language: string) => {
    const response = await fetch(`./assets/db/${language}/translation.json`);
    const json = await response.json();
    return json.menuContent;
  };

  const resources = await supportedLanguages.reduce(async (accPromise, language) => {
    const acc = await accPromise;
    acc[language] = {
      translation: {
        menuContent: await loadTranslation(language),
      },
    };
    return acc;
  }, Promise.resolve<Record<string, { translation: { menuContent: string } }>>({}));

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};
