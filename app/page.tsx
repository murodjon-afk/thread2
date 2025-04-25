'use client';

import Image from "next/image";
import Post from "@/components/posts";
import { useState } from "react";
import ModalPost from "@/components/create";
import { useSession } from "next-auth/react";  

export default function Home() {
  const { data: session } = useSession();  
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-[100vh] w-[100%] flex items-center justify-center flex-col">
        <h1 className="text-white pt-3 pb-2">For you</h1>
        <div className="h-[100%] w-[40%] bg-[#181818] rounded-t-[10px] overflow-auto scrollbar-none pb-5">
          <div className="px-3 w-[100%] h-20 flex items-center justify-between px-7 border-b-1 border-gray-500">
            {session?.user ? (  
              <>
             
                <div className="w-[60px] h-[60px] rounded-full  flex items-center justify-center">
                  <Image
                    src={session.user.image || "/profile.svg"} 
                    alt="User"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>

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
              </>
            ) : (
              <button
                className="w-[100%] h-10 bg-[#181818] text-white border rounded-[10px] cursor-pointer"
                onClick={() => window.location.href = '/api/auth/signin'}  
              >
                Signin
              </button>
            )}
          </div>

          <div className="flex gap-5 flex-col">
            <Post />
          </div>

          <ModalPost isOpen={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
