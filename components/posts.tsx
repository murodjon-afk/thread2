// components/Post.tsx (Без 'use client')

import React from "react";
import Image from "next/image";
import prisma from "@/lib/prisma";

const Post = async () => {
  // Получаем все посты
  const posts = await prisma.post.findMany();

  // Получаем все пользователей
  const users = await prisma.user.findMany();

  return (
    <div className="mx-auto p-4 space-y-4 w-full px-10">
      {posts.map((post) => {
        // Ищем пользователя, у которого id совпадает с authorId поста
        const user = users.find((user) => user.id === post.authorId);

        return (
          <div key={post.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src={  "/favicon.ico"} // Используем изображение пользователя
                  alt="Profile"
                  fill
                  className="rounded-full object-cover bg-gray-800"
                />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">
                  {user?.name || "Неизвестный пользователь"} {/* Имя пользователя */}
                </p>
                <p className="text-xs text-gray-500">@{user?.email} · 2h</p>
              </div>
            </div>

            <h1 className="text-white">{post.title}</h1>

            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <Image
                src={"https://i.ytimg.com/vi/r7eQGEOEfrA/sddefault.jpg"} // Изображение поста
                alt="Post"
                fill
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
