'use client';

import { useState } from "react";
import ModalPost from "@/components/create";
import { useTranslation } from "@/src/i18n/LanguageContext"; 

export default function ClientCreatePost() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(); 

  return (
    <>
      <h1
        className="w-[90%] pl-5 h-[100%] flex items-center cursor-text text-white"
        onClick={() => setOpen(true)}
      >
        {t("whats_new")} 
      </h1>
      <button
        className="w-30 h-10 bg-[#181818] text-white border rounded-[10px] cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {t("post")} 
      </button>
      <ModalPost isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
