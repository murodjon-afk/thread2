'use client';
import { useTranslation } from '../../src/i18n/LanguageContext'; // Импортируем контекст перевода

const LikePage = () => {
  const { t } = useTranslation(); // Используем контекст перевода для получения функции перевода

  return (
    <>
      <title>{t('likes')} . Threads</title> {/* Перевод заголовка */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={t('site_description')} /> {/* Перевод описания сайта */}
      <meta name="theme-color" content="#181818" />
      
      <div className="h-[100vh] w-[100%] flex items-center justify-center flex-col">
        <h1 className="text-white pt-3 pb-2">{t('actions')}</h1> {/* Перевод заголовка секции */}
        <div className="h-[100%] w-[40%] bg-[#181818] rounded-t-[10px] overflow-auto scrollbar-none pb-5 flex items-center justify-center">
          <h1 className="text-white">{t('no_actions')}</h1> {/* Перевод текста о том, что нет действий */}
        </div>
      </div>
    </>
  );
};

export default LikePage;
