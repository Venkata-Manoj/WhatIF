
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Skeleton className="h-10 w-24" />;
  }

  if (!user) {
    return (
      <Button onClick={() => router.push('/login')} variant="outline" size="lg" className="text-xl px-8 py-6 rounded-full">
        <LogIn className="mr-2 h-5 w-5" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
            <AvatarFallback>
              {user.displayName
                ? user.displayName.charAt(0)
                : user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem disabled>
          <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
