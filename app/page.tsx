"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const isLogged = true;
  return (
    <div className="w-full flex justify-center flex-col items-center">
     <div className="p-10 pt-28 container">
      <div className="text-center">
       <h1 className="text-4xl font-bold">Atgriezeniskā saite</h1>
       <p className="pt-5">Šajā lapā var vērtēt citus darbiniekus vai skolēnus, kā arī skolotājus un darba vadītājus.</p>
      </div>
     </div>
    </div>
  );
}
