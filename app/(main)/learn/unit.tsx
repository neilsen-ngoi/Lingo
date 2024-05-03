import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  //   activeLesson:
  //     | {
  //         id: number;
  //         title: string;
  //         order: number;
  //         unitId: number;
  //         unit: {
  //           id: number;
  //           title: string;
  //           description: string;
  //           courseId: number;
  //           order: number;
  //         };
  //         challenges: {
  //           id: number;
  //           order: number;
  //           lessonId: number;
  //           type: "SELECT" | "ASSIST";
  //           question: string;
  //           challengeProgress: any[];
  //         }[];
  //       }
  //     | undefined;
  //   activeLessonPercentage: number;
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className=" flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;

          const isLocked = !lesson.completed && !isCurrent;
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
