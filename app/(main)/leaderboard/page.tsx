"user client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";

const LeaderboardPage = async () => {
  const userSubscriptionData = getUserSubscription();
  const userProgressData = getUserProgress();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className=" flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className=" w-full flex flex-col items-center">
          <Image
            src={"/leaderboard.svg"}
            alt="leaderboard"
            height={90}
            width={90}
          />
          <h1 className=" text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className=" text-muted-foreground text-center text-lg mb-6">
            See how you are doing among other users
          </p>
          {/* TODO: add user list */}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
