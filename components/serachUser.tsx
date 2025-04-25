'use client';
import Image from "next/image";

export default function UserSearchMock() {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm  text-white w-[89%]">
      <div className="flex items-center gap-4">
      <Image
  src="/favicon.ico"
  alt="User avatar"
  width={48}
  height={48}
  className="rounded-full object-cover"
/>
        <div>
          <p className="text-sm font-semibold">John Doe</p>
          <p className="text-xs text-gray-500">@johndoe</p>
        </div>
      </div>
 
      <div className="w-6 h-6 bg-gray-300 rounded" />
    </div>
  );
}
