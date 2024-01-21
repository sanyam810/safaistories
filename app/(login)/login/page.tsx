"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
    const {data,status} = useSession();
    console.log(data,status)

    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated") {
        router.push("/");
      }
    }, [status, router]);

    if (status === "loading") {
      return <div className="text-center mt-8">Loading...</div>;
    }

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="bg-gray-100 p-20 flex flex-col gap-8 rounded-lg">
        <div
          className="bg-red-500 px-4 py-3 rounded-lg cursor-pointer text-white font-bold text-lg flex items-center justify-center"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
