"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


const AuthLinks = () => {
    
    const {status} = useSession();
    
    return (
        <>
            {status === "unauthenticated" ? (
                <Link href="/login">Login</Link>
            ) : (
                <>  <div className="hidden md:block">
                        <Link href="/write">Write</Link>
                        <span style={{paddingLeft:'40px'}} onClick={() => signOut()}>Logout</span>
                    </div>
                    <div className="flex flex-col gap-2 md:hidden">
                        <div className="flex flex-col">
                            <Link style={{paddingLeft:'25px'}} href="/write">Write</Link>
                            <span style={{paddingLeft:'20px',paddingTop:'14px'}} onClick={() => signOut()}>Logout</span>
                        </div>
                        
                    </div>
                </>
            )}
        </>
    );
}
 
export default AuthLinks;