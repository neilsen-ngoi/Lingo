"use server";

import { POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import {
  getCoursesById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { challengeProgress, userProgress, challenges } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { error } from "console";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }
  const course = await getCoursesById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }
  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses/");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "user",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses/");
  revalidatePath("/learn");
  redirect("/learn");
};
// challenge action logic to handle incorrect options
export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });
  // ^^if existing progress is found we then determine if user is practicing a completed challenge

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }
  // the difference between the 2 types of errors is that the one below will break the app since user progress is definitly needed.
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (userSubscription?.isActive) {
    return { error: "Subscription" };
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }
  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts Full!");
  }
  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }
  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
