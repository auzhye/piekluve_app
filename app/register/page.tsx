"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Form() {
 const [data, setData] = useState({username:"", password:""});
 const [res, setRes] = useState("");
 const router = useRouter();
 //pb.authStore.loadFromCookie(cookie!)
 const submit = async (e:any) => {
  e.preventDefault();
  try {
   fetch("http://localhost:5000/register", {
    method:"POST",
    credentials: 'include',
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   }).then((e) => {
    if (e.status === 200) {
     e.json()
     router.push("/login");
    } else {
     setRes("Input valid details");
    }
   }).then((e) => 
    e
   );
  } catch (err) {
   console.log(err);
  }
 }
 return (
  <main className="flex justify-center w-full py-32">
  <form onSubmit={submit} className="shadow-xl py-16 px-5 rounded-md sm:w-1/3 w-full border-slate-700 border flex flex-col items-center">
   <div className="pb-8">
    <h1 className="dark:text-white text-slate-800 text-4xl">Reģistrēties OKDD</h1>
   </div>
   <div className="flex flex-col w-3/4">
    <label htmlFor="user">Username</label>
    <input id="user" className="border rounded-sm text-black my-3 p-2" type="text" value={data.username} onChange={(e) => setData({...data, username: e.currentTarget.value})} />
    <label htmlFor="pass">Password</label>
    <input id="pass" className="border rounded-sm text-black my-3 p-2 mb-9" type="password" value={data.password} onChange={(e) => setData({...data, password: e.currentTarget.value})} />
    <button className="rounded-sm bg-blue-400 p-2 text-white" type="submit">Register</button>
   </div>
   <p className="pt-2">{res}</p>
  </form>
 </main>
 );
}