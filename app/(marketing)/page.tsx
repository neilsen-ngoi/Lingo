import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignUpButton, SignInButton } from "@clerk/clerk-react";
import {Loader} from 'lucide-react'
import Image from "next/image";

export default function Home() {
return (

<div className=" max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
  <div className=" relative w-240px h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
    <Image src={"/hero.svg"} fill alt='Hero'/>
  </div>
  <div className=" flex flex-col items-center gap-y-8">
    <h1>Learn, practice, and master new languages with Lingo.</h1> 
    </div>
    <div>
      <ClerkLoading>
        <Loader className=" h-5 w-5 to-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignUpButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
            <Button size={'lg'} variant={'secondary'} className="w-full">
              Get Started
            </Button>
          </SignUpButton>
          <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
            <Button size={'lg'} variant={'primaryOutline'} className="w-full">
              I already have an account
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>

        </SignedIn>
      </ClerkLoaded>
    </div>
  </div>  
)
}
