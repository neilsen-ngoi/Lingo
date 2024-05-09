"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export const Promo = () => {
  return (
    <div className=" border-2 round=xl p-4 space-y-4">
      <div className=" space-y-2">
        <div className=" flex items-center gap-x-2">
          <Image src={"/unlimited.svg"} alt="pro" width={26} height={26} />
          <h3 className=" font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p className=" text-muted-foreground">Get unlimited hearts and more!</p>
        <Button variant={"super"} />
      </div>
    </div>
  );
};
