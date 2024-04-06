"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/libs/auth";
import useUser from "@/libs/useuser";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const {loggedIn} = useUser();
 const [isOpen, setOpen] = useState(false);
 const [width, setWidth] = useState<number>(window.innerWidth);
 function handleWindowSizeChange() {
  if (window !== undefined) {
   setWidth(window.innerWidth);
  }
 }
 useEffect(() => {
  window.addEventListener('resize', handleWindowSizeChange);
  return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
  }
 }, []);
 const isMobile = width <= 768;
  return (
   <AuthProvider>
    <html lang="en">
      <body className={inter.className}>
       <nav className="bg-slate-900 text-white p-4 w-full flex flex-col md:flex-row justify-between relative">
       <div className="w-full flex flex-row justify-between">
        <div>
         <b><a href="/">Home</a></b>
        </div>
        <div className="md:hidden cursor-pointer" onClick={ () => setOpen(!isOpen)}>x</div>
       </div>

       <div className="text-center">
        <div className="w-full hidden md:block">
         {loggedIn 
         ?
         <>
          <a href="/profile">Reitings</a>
          <a href="/logout">Logout</a>
         </>
         :
         <>
          <a href="/login">Login</a>
          <a href="/register">Register</a> 
         </>
         }
        </div>
       {isOpen ?
       <>
        <div className="flex flex-col w-full md:hidden">
        {loggedIn 
        ?
        <>
         <a href="/profile">Reitings</a>
         <a href="/logout">Logout</a>
        </>
        :
        <>
         <a href="/login">Login</a>
         <a href="/register">Register</a> 
        </>
        }
        </div>
       </>
       :
       null
       }
       </div>

       </nav>
       {children}
      </body>
    </html>
   </AuthProvider>
  );
}
