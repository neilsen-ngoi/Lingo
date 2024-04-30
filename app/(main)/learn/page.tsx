import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  //will solve waterfall issue in browser
  const [userProgress] = await Promise.all([userProgressData]);
  //redirect if no progress or active user course
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  //todo remove flex row reverse from 1st div
  return (
    <div className=" flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="TITS" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
