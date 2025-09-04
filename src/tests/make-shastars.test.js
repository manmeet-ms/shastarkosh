import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import ShastarInfo from "../../backend/models/ShastarInfo.model.js";

const generateShastar = () => ({
  name: faker.vehicle.vrm(),
  alternativeNames: [faker.system.networkInterface(), faker.word.adjective(), faker.system.networkInterface(), faker.system.networkInterface()],
  mainImage: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
  images: [`https://picsum.photos/${Math.floor(Math.random() * 1000)}`, `https://picsum.photos/${Math.floor(Math.random() * 1000)}`, `https://picsum.photos/${Math.floor(Math.random() * 1000)}`],

  description: faker.lorem.paragraphs(6),
  subType: `${faker.science.chemicalElement().name}:${faker.science.chemicalElement().atomicNumber}`,
  material: faker.hacker.abbreviation(),
  weight: faker.number.int({ min: 2, max: 1000 }), // e.g., 1.5
  length: faker.number.int({ min: 30, max: 300 }), // in cm
  usage: faker.lorem.sentence(),
  comments: Array.from({ length: faker.number.int({ min: 5, max: 62 }) }, () => ({
    user: faker.string.hexadecimal({ length: 24, casing: "lower" }).replace("0x", ""),
    username: faker.person.fullName(),
    avatar: faker.image.personPortrait({ sex: "female" }),
    text: faker.lorem.lines({ min: 2, max: 5 }),
    upvotes: faker.number.int({ min: 0, max: 98 }),
    replies: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      user: faker.string.hexadecimal({ length: 24, casing: "lower" }).replace("0x", ""),
      username: faker.person.fullName(),
      avatar: faker.image.personPortrait({ sex: "female" }),
      text: faker.lorem.lines({ min: 2, max: 5 }),
      likes: faker.number.int({ min: 12, max: 84 }),
      createdAt: faker.date.anytime(),
    })),
    createdAt: faker.date.anytime(),
  })),
  origin: {
    region: faker.location.country(),
    culture: faker.person.zodiacSign(),
    timePeriod: faker.date.past({ years: 1000 }),
    yearEstimated: faker.date.past({ years: 500 }).getFullYear(), // just year as number
  },
  sources: [
    {
      title: faker.word.words(3),
      author: faker.person.lastName(),
      link: faker.internet.url(),
      year: faker.date.past({ years: 200 }),
    },
  ],
  likes: faker.number.int({ min: 32, max: 250 }),
  views: faker.number.int({ min: 32, max: 50000 }),
  categories: [faker.word.noun(), faker.word.adjective()],
  tags: [faker.word.noun(), faker.word.noun(), faker.word.adjective()],
});
const makeShastars = async (numberOfShastars) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");

    const shastars = Array.from({ length: numberOfShastars }, () => generateShastar());

    await ShastarInfo.insertMany(shastars);
    console.log(` Successfully inserted ${numberOfShastars} shastars`);

    await mongoose.disconnect();
    console.log("  Disconnected from MongoDB");
  } catch (error) {
    console.error("  Error seeding shastars:", error);
    process.exit(1);
  }
};

// Run Seeder
makeShastars(200);
