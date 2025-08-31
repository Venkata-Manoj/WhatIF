
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ user?: User | null; error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ user?: User | null; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    if (!auth) {
      console.error("Firebase not initialized");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) {
        return { error: "Firebase not initialized" };
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error: any) {
      console.error("Error signing up with email", error);
      return { error: error.message };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) {
        return { error: "Firebase not initialized" };
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error: any) {
      console.error("Error signing in with email", error);
       return { error: error.message };
    }
  };

  const logOut = async () => {
    if (!auth) {
        console.error("Firebase not initialized");
        return;
    }
    try {
      await signOut(auth);
       router.push('/login');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut: logOut,
    signUpWithEmail,
    signInWithEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
