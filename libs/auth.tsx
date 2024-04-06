"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
interface User {
 // Define your user object structure here
 username: string;
 // Add other properties as needed
}

interface AuthContextProps {
 user: User | null;
 login: () => void;
 register: () => void;
 logout: () => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  console.log(user)
  useEffect(() => {
    // Check if the user is authenticated on initial load
    async function get() {
     
     try {
      await fetch("http://localhost:5000/profile", {
       credentials: 'include',
       method:"GET",
       headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }}).then(async(res) => {
       if (res.status === 200 || pathname.includes("/login") || pathname.includes("/register")) {
        setUser(await res.json());
       } else {
        router.push('/login');
       }
      });
    } catch (error: any) {
      console.error('Authentication error:', error.response?.data || error.message);
      setUser(null);
      router.push('/login');
    }
    }
    get();
  }, []);
  const login = () => {
   router.push('/profile');
  };
  const register = () => {
   router.push("/profile");
  }
  const logout = () => {
   router.push('/login');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};