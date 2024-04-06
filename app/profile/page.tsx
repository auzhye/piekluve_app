"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { Rating } from 'react-simple-star-rating'
import useUser from "@/libs/useuser";
import { useAuth } from "@/libs/auth";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [users, setUsers] = useState<any>();
  const [user, setUser] = useState<Number>();
  const [me, setMe] = useState();
  const {loggedIn} = useUser();
  const handleRating = (rate: number) => {
   setRating2(rate)

   // other logic
  }
  async function submitForm() {
   await fetch("http://localhost:5000/generate", {
    method:"POST",
    credentials: 'include',
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
    body: JSON.stringify({rating:rating2,authorId:user}),
   }).then(async (e) => {
    if (e.status === 200) {
     console.log("Submitted!");
    }
   }).then((e) => 
    e
   );
  }
  useEffect(() => {
   fetch("http://localhost:5000/get", {
    method:"GET",
    credentials: 'include',
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
   }).then(async (e) => {
    if (e.status === 200) {
     setUsers(await e.json());
    } 
   }).then((e) => 
    e
   );
   fetch("http://localhost:5000/getrating", {
    method:"GET",
    credentials: 'include',
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
   }).then(async (e) => {
    if (e.status === 200) {
     setRating(await e.json());
    } 
   }).then((e) => 
    e
   );
   fetch("http://localhost:5000/profile", {
    method:"GET",
    credentials: 'include',
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
   }).then(async (e) => {
    if (e.status === 200) {
     setMe(await e.json());
    } 
   })
  }
  ,[]);
  return (
   <>
   {
    loggedIn ?
    <div className="w-full flex justify-center flex-col items-center">
     <div className="p-10 pt-28 container">
      <div className="text-center">
       <h1 className="text-4xl font-bold">Vērtēt</h1>
       <label htmlFor="selector" className="pt-5">Izvēlies kolēģi:</label>
       <div>
        <select onChange={(e) => setUser(new Number(e.currentTarget.value))} name="selector" id="selector">
         
         {users?.map((e:any) => (
          <option key={e.id} value={e.id}>{e.username}</option>
          ))}
        </select><br />
        <div className="flex justify-center items-center pt-4">
         <Rating SVGstyle={{'display':'inline'}} onClick={handleRating} initialValue={0} readonly={false}/>
         <input onClick={() => submitForm()} className="p-1 rounded-sm bg-slate-950 text-white hover:cursor-pointer" type="submit" value="Vertet"/>
        </div>
       </div>
      </div>
      <div className="text-center pt-12">
       <h1 className="text-4xl font-bold pb-5">Tavs vidējais reitings</h1>
       <Rating SVGstyle={{'display':'inline'}} className="inline" readonly={true} initialValue={rating}/>
      </div>
     </div>
    </div> : <p>Unauthorized</p>
   }</>

  );
}