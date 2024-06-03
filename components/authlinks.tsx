"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


const AuthLinks = () => {
    
    const {status} = useSession();
    
    return (
        <>
            {status === "unauthenticated" ? (
                <div style={{paddingLeft:'25px'}}>
                    <Link href="/login">Login</Link>
                </div>
                
            ) : (
                <>  <div className="hidden md:block">
                        <Link href="/write" className='cursor-pointer'>Write</Link>
                        <span style={{paddingLeft:'40px'}} onClick={() => signOut()}>Logout</span>
                    </div>
                    <div className="flex flex-col gap-2 md:hidden">
                        <div className="flex flex-col">
                            <Link className='cursor-pointer' style={{paddingLeft:'25px'}} href="/write">Write</Link>
                            <span className='cursor-pointer' style={{paddingLeft:'20px',paddingTop:'14px'}} onClick={() => signOut()}>Logout</span>
                        </div>
                        
                    </div>
                </>
            )}
        </>
    );
}
 
export default AuthLinks;