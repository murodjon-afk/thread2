import Image from "next/image";
import Post from "@/components/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions"; 
import ClientCreatePost from "../components/client-create-post";

export default async function Home() {
  const session = await getServerSession(authOptions);
 
const t = "some value";



  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center flex-col">
      <h1 className="text-white pt-3 pb-2">For you</h1>
      <div className="h-[100%] w-[40%] bg-[#181818] rounded-t-[10px] overflow-auto scrollbar-none pb-5">
        <div className="px-3 w-[100%] h-20 flex items-center justify-between px-7 border-b-1 border-gray-500">
          {session?.user ? (
            <>
              <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                <Image
                  src={ "/profile.svg"}
                  alt="User"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <ClientCreatePost />
            </>
          ) : (
            <form action="/api/auth/signin" method="get" className="w-full">
              <button
                className="w-[100%] h-10 bg-[#181818] text-white border rounded-[10px] cursor-pointer"
                type="submit"
              >
                Sign in
              </button>
            </form>
          )}
        </div>

        <div className="flex gap-5 flex-col">
          <Post />
        </div>
      </div>
    </div>
  );
}