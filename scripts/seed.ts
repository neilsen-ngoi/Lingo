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
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    // seed language courses
    await db.insert(schema.courses).values([
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
    ]);
    // seed challengeOptions
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // How do you say "Man"?
        imageSrc: "/boy.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 2,
        challengeId: 1, // How do you say "Man"?
        imageSrc: "/girl.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1, // How do you say "Man"?
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();