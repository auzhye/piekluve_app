"use client";
import { useState } from "react";
import useUser from "@/libs/useuser";
import { useRouter } from 'next/navigation'
export default function Form() {
 const {loggedIn, user, error, mutate} = useUser();
 const [data, setData] = useState({username:"", password:""});
 const [res, setRes] = useState<any>("");
 const router = useRouter();
 //pb.authStore.loadFromCookie(cookie!)
 const submit = async () => {
  try {
   await fetch("http://localhost:5000/logout", {
    method:"POST",
    credentials: 'include',
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   }).then((e) => {
    if (e.status === 200) {
     mutate();
     router.push("/profile");
     setRes("Success!");
     return e.json()
    } else {
     setRes("Please input valid credentials");
    }
   }).then((e) => e);
  } catch (err) {
   setRes(`${err}`)
  }
 }
 submit();
 return (
 <main className="flex justify-center w-full py-32">
  <p>{res}</p>
 </main>
 );
}