'use client'
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {" "}
      <div className="flex items-center gap-4">
        {status === "authenticated" ? (
          <>
            <p className="text-center h-full flex items-center p-3">
              {session.user.email}
            </p>
            
          </>
        ) : (
          <p>You are not signed in</p>
        )}
      </div>
    </div>
  );
};

export default page;
