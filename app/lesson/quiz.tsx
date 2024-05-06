"use client";
import Image from "next/image";
import Confetti from "react-confetti";
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize } from "react-use";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any; //TODO: replace with subscription DB type
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialLessonChallenges,
  initialPercentage,
  userSubscription,
}: Props) => {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [inCorrectAudio, _i, inCorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [pending, startTransition] = useTransition();
  //STATES------------------------------------------------------
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const [selectedOption, setSelectedOption] = useState<number>();
  //FUNCTIONS---------------------------------------------------
  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);
    if (!correctOption) {
      return;
    }
    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing hearts");
              return;
            }
            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
            // check for 100% completion of lesson
            // and user is practicing
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Somthing went wrong, please try again"));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing hearts");
              return;
            }
            inCorrectControls.play();
            setStatus("wrong");
            // if there is no error, that means the backend has been hit and the hearts reduced, so we must reflect that on the front end.
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong, please try again"));
      });
    }
  };

  //FINISHEDCHALLENGE------------------------------------------
  // bandaid, for issue where error page show after completing challenge without follow up challenge
  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className=" flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center item-center justify-center h-full">
          <Image
            src={"/finish.svg"}
            alt="Finish"
            className="hidden lg:block mx-auto"
            height={100}
            width={100}
          />
          <Image
            src={"/finish.svg"}
            alt="Finish"
            className="block lg:hidden mx-auto"
            height={50}
            width={50}
          />
          <h1 className=" text-xl lg:text-3xl font-bold text-neutral-700">
            Great Job <br /> You&apos;ve completed the lesson
          </h1>
          <div className=" flex items-center gap-x-4 w-full">
            {/* for production save the 10 in the value item as a const */}
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={challenges.length * 10} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaing"
      : challenge.question;
  //CHALLENGE---------------------------------------------------
  return (
    <>
      {inCorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className=" flex-1">
        <div className=" h-full flex items-center justify-center">
          <div className=" lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1
              className=" text-lg lg:text-3xl text-center
            lg:text-start font-bold text-neutral-700"
            >
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                //TODO: make status dynamically update:completed
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
