'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

type ModalPostProps = {
  isOpen: boolean;
  onClose: () => void;
};

const iconButtonStyle =
  'p-2 hover:scale-90 transition-all duration-200 ease-in-out active:scale-95 cursor-pointer';

const ModalPost: React.FC<ModalPostProps> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [isGifSectionOpen, setIsGifSectionOpen] = useState<boolean>(false);
  const [showHashInput, setShowHashInput] = useState<boolean>(false);
  const [hashValue, setHashValue] = useState<string>('#');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const countries = [
    'United States', 'Canada', 'Mexico', 'Brazil', 'United Kingdom', 'Germany', 'France',
    'Italy', 'Australia', 'Japan', 'China', 'India', 'Russia', 'South Korea', 'South Africa',
    'Argentina', 'Colombia', 'Egypt', 'Nigeria', 'Saudi Arabia',
  ];

  const gifs = [
    'https://media4.giphy.com/media/Ynxe6hEwjITyAu2v80/giphy.gif',
    'https://media.giphy.com/media/Qw4X3FLQZZLJ4ndBcPK/giphy.gif',
    'https://media.giphy.com/media/gdguNVFdq0Tf0xVBds/giphy.gif',
    'https://media.giphy.com/media/bnZ73g0fO0c6s/giphy.gif',
    'https://media.giphy.com/media/febzgZfQrdU2ahhyeT/giphy.gif',
  ];

  if (!isOpen) return null;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleGifClick = () => {
    setIsGifSectionOpen(!isGifSectionOpen);
  };

  const handleGifSelect = (gifUrl: string) => {
    setSelectedGif(gifUrl);
    setIsGifSectionOpen(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedGif(null);
    setIsGifSectionOpen(false);
    setShowHashInput(false);
    setHashValue('#');
    setSelectedLocation(null);
    setIsMapOpen(false);
  };

  const handleHashClick = () => {
    setShowHashInput(true);
  };

  const handleHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashValue(e.target.value);
  };

  const handleMapClick = () => {
    setIsMapOpen(true);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedLocation(country);
    setIsMapOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#181818] rounded-2xl w-[600px] p-6 shadow-lg relative">
        <div className="w-full border-b border-gray-600 mb-2 flex items-center justify-between h-[50px]">
          <h1 className="text-white text-xl">New Thread</h1>
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="text-white cursor-pointer hover:text-red-500 text-xl"
          >
            cancel
          </button>
        </div>

        <div className="flex items-start gap-4 justify-center">
          <div className="relative w-16 h-16">
            <button className="w-[60px] h-[60px] rounded-full bg-gray-700 flex items-center justify-center">
              <Image
                src="/profile.svg"
                alt="Sign In"
                width={30}
                height={30}
              />
            </button>
            <p className="text-white text-xs text-center mt-1">Гость</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              className="h-[50px] border-b border-gray-600 rounded-lg p-3 text-sm bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              placeholder="What’s new?"
              aria-label="Новое сообщение"
            />

            <div className="flex items-center gap-2 mt-2">
              <button className={iconButtonStyle} onClick={handleGifClick}>
                <Image src="/gif.svg" alt="GIF icon" width={30} height={30} />
              </button>

              <button className={iconButtonStyle} onClick={handlePhotoClick}>
                <Image src="/photo.svg" alt="Photo icon" width={30} height={30} />
              </button>

              <button className={iconButtonStyle}>
                <Image src="/emoji.svg" alt="Emoji icon" width={30} height={30} />
              </button>

              <button className={iconButtonStyle} onClick={handleHashClick}>
                <Image src="/hash.svg" alt="Hashtag icon" width={30} height={30} />
              </button>

              <button className={iconButtonStyle} onClick={handleMapClick}>
                <Image src="/map.svg" alt="Map icon" width={30} height={30} />
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="mt-4 flex flex-row gap-2 overflow-x-auto scrollbar-none">
              {selectedImage && (
                <div className="relative w-40 h-40 border border-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt="Selected Image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {selectedGif && (
                <div className="relative w-40 h-40 border border-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={selectedGif}
                    alt="Selected GIF"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {selectedLocation && (
                <div className="text-white text-sm flex items-center justify-center w-40 h-40 border border-gray-700 rounded-lg overflow-hidden">
                  <span>{selectedLocation}</span>
                </div>
              )}
            </div>

            {showHashInput && (
              <input
                type="text"
                value={hashValue}
                onChange={handleHashChange}
                className="mt-4 h-[40px] border-b border-gray-600 rounded-lg p-3 text-sm bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm cursor-pointer"
          >
            Сбросить
          </button>
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-sm cursor-pointer"
          >
            Опубликовать
          </button>
        </div>
      </div>

      {isGifSectionOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-[#181818] rounded-2xl w-[500px] p-6 shadow-lg relative overflow-auto max-h-[400px]">
            <h2 className="text-white text-xl mb-4">Select a GIF</h2>
            <div className="flex flex-wrap gap-4 max-h-[300px] overflow-auto">
              {gifs.map((gif, index) => (
                <button
                  key={index}
                  onClick={() => handleGifSelect(gif)}
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-blue-600 text-sm cursor-pointer"
                >
                  <Image src={gif} alt="GIF" width={100} height={100} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsGifSectionOpen(false)}
              className="mt-4 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-sm cursor-pointer"
            >
              Close GIF selection
            </button>
          </div>
        </div>
      )}

      {isMapOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-[#181818] rounded-2xl w-[500px] p-6 shadow-lg relative max-h-[500px]">
            <h2 className="text-white text-xl mb-4">Select a Country</h2>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-auto scrollbar-none">
              {countries.map((country, index) => (
                <button
                  key={index}
                  onClick={() => handleCountrySelect(country)}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm cursor-pointer"
                >
                  {country}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMapOpen(false)}
              className="mt-4 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-sm cursor-pointer"
            >
              Close Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPost;
