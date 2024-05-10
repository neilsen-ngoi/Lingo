import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

// seeding script
const main = async () => {
  try {
    console.log("Seeding the database");
    await db.delete(schema.units);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // seed language courses
    await db.insert(schema.units).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 5,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
    ]);

    // seed units
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // spanish
        title: "Unit 1",
        description: "Spanish 101",
        order: 1,
      },
    ]);
    // seed lessons
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Verbs",
      },
    ]);

    // seed challenges
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'How do you say "Man"?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: "The Man",
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: "Which one is Zombie?",
      },
    ]);
    // seed challengeOptions
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // How do you say "Man"?
        imageSrc: "/boy.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1, // How do you say "Man"?
        imageSrc: "/girl.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1, // How do you say "Man"?
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "/boy.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/zombie.svg",
        correct: true,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // verbs
        type: "SELECT",
        order: 1,
        question: 'How do you say "Man"?',
      },
      {
        id: 5,
        lessonId: 2, // verbs
        type: "ASSIST",
        order: 2,
        question: "The Man",
      },
      {
        id: 6,
        lessonId: 2, // verbs
        type: "SELECT",
        order: 3,
        question: "Which one is Zombie?",
      },
    ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
