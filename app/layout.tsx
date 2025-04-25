'use client';

import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import ModalPost from '@/components/create';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RootLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: RootLayoutProps) {
  const { data: session } = useSession(); 

  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const router = useRouter();

  const buttons = ['/home.svg', '/search.svg', '/activiti.svg', '/like.svg', '/profile.svg'];
  const handleButtonClick2 = () => {
    if (session) {
      setOpen(true);
     } else{
      router.push('/api/auth/signin');
     }
  }
  const handleButtonClick = (src: string) => {
    if (src === '/activiti.svg') {
     if (session) {
      setOpen(true);
     } else{
      router.push('/api/auth/signin');
     }
    } else if (src === '/profile.svg') {
      if (session) {
        setActiveButton(src);
      
      } else {
        router.push('/api/auth/signin');
      }
    } else {
      setActiveButton(src);
      if (src === '/home.svg') router.push('/');
      if (src === '/search.svg') router.push('/search');
      if (src === '/like.svg') router.push('/likes');
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-20 bg-black p-4 flex flex-col items-center justify-between py-5">
        <Link href={'/'}>
          <Image src="/Threads.svg" alt="Threads Icon" width={30} height={30} />
        </Link>
        <nav className="flex flex-col gap-2 items-center">
          {buttons.map((src, idx) => {
            const isProfile = src === '/profile.svg';

            return (
              <button
                key={idx}
                onClick={() => handleButtonClick(src)}
                className={`hover:scale-110 hover:bg-[#181818] transition-transform duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 w-[60px] h-[50px] rounded-[10px] flex items-center justify-center p-1 ${activeButton === src ? 'bg-[#333]' : ''}`}
              >
                {isProfile && session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <Image src={src} alt={`icon-${src}`} width={35} height={35} />
                )}
              </button>
            );
          })}
        </nav>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:scale-110 transition-transform duration-200 cursor-pointer rounded-full p-1">
                <Image src="/secure.svg" alt="Secure Icon" width={35} height={35} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#181818] text-white border border-gray-700 w-[350px] h-[450px] pl-3 pr-3 pt-3">
              <DropdownMenuItem className="hover:bg-[#212121] h-[50px] text-xl">Для вас</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#212121] h-[50px] text-xl">Подписки</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#212121] h-[50px] text-xl">Вы поставили нравиться</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#212121] h-[50px] text-xl">Сохраненные</DropdownMenuItem>
              <DropdownMenuItem className="hover:text-red-500 hover:bg-[#212121] h-[50px] text-xl">Поиск</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:scale-110 transition-transform duration-200 cursor-pointer rounded-full p-1">
                <Image src="/group.svg" alt="Group Icon" width={35} height={35} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#181818] text-white border border-gray-700 w-[300px] h-[300px] pl-3 pr-3 pt-3">
              <DropdownMenuItem className="hover:bg-[#212121] h-[50px] text-xl">Настройки</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-400 hover:text-red-500 hover:bg-[#212121] h-[50px] text-xl cursor-pointer"
              >
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <div className="flex-1 pt-10 w-full h-screen bg-black flex items-end justify-center">
        {children}
      </div>

      <button
  className="fixed bottom-4 bg-[#181818] right-4 hover:scale-110 transition-transform duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 p-1 h-18 w-20 flex items-center justify-center rounded-[10px]"
  onClick={handleButtonClick2}  
>
  <Image src="/activiti.svg" alt="Activity Icon" width={35} height={35} />
</button>

      <ModalPost isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Главная . Threads</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Описание сайта" />
        <meta name="theme-color" content="#181818" />
      </head>
      <body className="bg-black">
        <SessionProvider>
          <LayoutContent>{children}</LayoutContent>
        </SessionProvider>
      </body>
    </html>
  );
}
