'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '../src/i18n/LanguageContext'; // Импортируем контекст перевода

type ModalPostProps = {
  isOpen: boolean;
  onClose: () => void;
};

const iconButtonStyle =
  'p-2 hover:scale-90 transition-all duration-200 ease-in-out active:scale-95 cursor-pointer';

const ModalPost: React.FC<ModalPostProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation(); // Используем контекст для перевода
  const [title, setTitle] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setTitle('');
  };

  const handlePublish = async () => {
    if (!title.trim()) return;

    try {
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      handleReset();
      onClose();
    } catch (error) {
      console.error('Ошибка при публикации:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#181818] rounded-2xl w-[600px] p-6 shadow-lg relative">
        <div className="w-full border-b border-gray-600 mb-2 flex items-center justify-between h-[50px]">
          <h1 className="text-white text-xl">{t('new_thread')}</h1> {/* Используем перевод */}
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="text-white cursor-pointer hover:text-red-500 text-xl"
          >
            {t('cancel')} {/* Перевод для кнопки отмены */}
          </button>
        </div>

        <div className="flex items-start gap-4 justify-center">
          <div className="relative w-16 h-16">
            <button className="w-[60px] h-[60px] rounded-full bg-gray-700 flex items-center justify-center">
              <Image
                src="/profile.svg"
                alt={t('profile')} 
                width={30}
                height={30}
              />
            </button>
          </div>

          <div className="flex flex-col w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[50px] border-b border-gray-600 rounded-lg p-3 text-sm bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              placeholder={t('whats_new_placeholder')} 
              aria-label={t('new_message')} 
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm cursor-pointer"
          >
            {t('reset')} {/* Перевод для кнопки сброса */}
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-sm cursor-pointer"
          >
            {t('publish')} {/* Перевод для кнопки публикации */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
