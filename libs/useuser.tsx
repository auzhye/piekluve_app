"use client"
import useSWR, { BareFetcher } from "swr";

export const fetcher:BareFetcher = async () => {
 try {
   return fetch("http://localhost:5000/profile",{
    credentials: 'include',
    method:"GET",
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
   }}).then((res) => { return (res.status === 200 ? res.json() : null)}).catch((err) => {console.log(err); return null});
 } catch (error) {
   console.log(error);
   throw error;
 }
};
interface SWRData {
 data: User,
 mutate: any,
 error: any
}
interface User {
 id:      number,
 username:String,
 password:String,
 token?:   string,
 rating:    Rating[]
}
interface Rating {
 id: number,
 rating: number,
 authorId:number,
 user: User
}

export default function useUser() {
  const { data, mutate, error } = useSWR("/", fetcher);
  const loading = !data && !error;
  const loggedIn = !error && data;
  return {
    loading,
    loggedIn,
    user: data,
    mutate,
    error
  };
}