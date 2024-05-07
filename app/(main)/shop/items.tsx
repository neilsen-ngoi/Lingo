"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const POINTS_TO_REFILL = 10;
export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();
  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }
    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <ul className=" w-full">
      <div className=" flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/hearts.svg"} alt="hearts" width={60} height={60} />
        <div className=" flex-1">
          <p className=" text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
          onClick={onRefillHearts}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className=" flex items-center">
              <Image src={"/points.svg"} alt="points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};
