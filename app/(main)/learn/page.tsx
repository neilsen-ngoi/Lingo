import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
  //todo remove flex row reverse may not be needed
  return (
    <div className=" flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "English", imageSrc: "/es.svg" }}
          hearts={5}
          points={1}
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
