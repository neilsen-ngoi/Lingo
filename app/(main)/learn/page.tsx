import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import React from "react";

const LearnPage = () => {
  //todo remove flex row reverse may not be needed
  return (
    <div className=" flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>sw</StickyWrapper>
      <FeedWrapper>
        <Header />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
