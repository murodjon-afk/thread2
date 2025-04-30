// components/client-create-post.tsx
'use client';

import { useState } from "react";
import ModalPost from "@/components/create";

export default function ClientCreatePost() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1
        className="w-[90%] pl-5 h-[100%] flex items-center cursor-text text-white"
        onClick={() => setOpen(true)}
      >
        Whats new?
      </h1>
      <button
        className="w-20 h-10 bg-[#181818] text-white border rounded-[10px] cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Post
      </button>
      <ModalPost isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
