import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import ShastarInfo from "../../backend/models/ShastarInfo.model.js";
import SparkMD5 from "spark-md5";
import User from "../../backend/models/User.model.js";

// Generate a Shastar document with a required createdBy user id
const generateShastar = (createdById) => ({
  title: faker.vehicle.vrm(),
  alternativeNames: [
    faker.system.networkInterface(),
    faker.word.adjective(),
    faker.system.networkInterface(),
    faker.system.networkInterface(),
  ],
  mainImage: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.internet.email()))}?d=retro`,
  images: [
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
  ],

  description: faker.lorem.paragraphs(6),
  type: "weapon",
  subType: `${faker.science.chemicalElement().name}:${faker.science.chemicalElement().atomicNumber}`,
  material: [faker.hacker.abbreviation(), faker.hacker.abbreviation()],
  weight: faker.number.int({ min: 2, max: 1000 }),
  length: faker.number.int({ min: 30, max: 300 }),
  usage: [faker.word.noun(), faker.word.verb(), faker.word.adjective()],
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
    timePeriod: `${faker.date.past({ years: 1500 }).getFullYear()} CE`,
    yearEstimated: faker.date.past({ years: 500 }).getFullYear(),
  },
  sources: [
    {
      title: faker.word.words(3),
      author: faker.person.lastName(),
      link: faker.internet.url(),
      year: faker.date.past({ years: 200 }).getFullYear(),
    },
  ],
  likes: faker.number.int({ min: 32, max: 250 }),
  views: faker.number.int({ min: 32, max: 50000 }),
  category: [faker.word.noun(), faker.word.adjective()],
  tags: [faker.word.noun(), faker.word.noun(), faker.word.adjective()],
  createdBy: createdById,
});

const makeShastars = async (numberOfShastars) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");

    // Ensure a user exists to satisfy required createdBy
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        username: `seed_${faker.internet.userName().toLowerCase()}_${faker.number.int({ min: 1000, max: 9999 })}`,
        name: faker.person.fullName(),
        email: `seed_${faker.number.int({ min: 1000, max: 9999 })}_${faker.internet.email().toLowerCase()}`,
        password: faker.internet.password({ length: 12 }),
        avatar: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.internet.email()))}?d=retro`,
      });
    }

    const shastars = Array.from({ length: numberOfShastars }, () => generateShastar(user._id));

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
