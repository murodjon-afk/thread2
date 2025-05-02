'use client'; // Добавляем директиву для клиентского компонента

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Locale } from './request';  

const defaultLang: Locale = 'ru';

const LanguageContext = createContext<{
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
}>( {
  lang: defaultLang,
  setLang: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Locale>(defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Locale;
    if (saved) setLang(saved);
  }, []);

  const changeLang = (l: Locale) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
