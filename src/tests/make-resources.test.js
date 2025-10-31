import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import ResourceMaterial from "../../backend/models/ResourceMaterial.model.js";
import ShastarInfo from "../../backend/models/ShastarInfo.model.js";
import SparkMD5 from "spark-md5";
import User from "../../backend/models/User.model.js";

// Generate a Shastar document with a required createdBy user id
const generateShastar = (createdById) => ({
  title: faker.lorem.words({ min: 2, max: 6 }),
  mainImage: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.internet.email()))}?d=retro`,
  images: [
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
  ],
  description: faker.lorem.paragraphs(4),

  origin: {
    region: faker.location.country(),
    culture: faker.word.noun(),
    timePeriod: `${faker.date.past({ years: 1500 }).getFullYear()} CE`,
    yearEstimated: faker.date.past({ years: 500 }).getFullYear(),
  },

  sources: [
    {
      title: faker.word.words(3),
      author: faker.person.fullName(),
      link: faker.internet.url(),
      publication: faker.company.name(),
      year: faker.date.past({ years: 200 }).getFullYear(),
    },
  ],

  createdBy: createdById,
  category: faker.word.noun(),
  tags: [faker.word.noun(), faker.word.noun(), faker.word.adjective()],

  likes: faker.number.int({ min: 0, max: 500 }),
  dislikes: faker.number.int({ min: 0, max: 100 }),
  views: faker.number.int({ min: 0, max: 100000 }),
  commentCount: faker.number.int({ min: 0, max: 250 }),
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

const generateResource = (createdById) => ({
  title: faker.lorem.words({ min: 2, max: 6 }),
  mainImage: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.internet.email()))}?d=retro`,
  images: [
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
  ],
  description: faker.lorem.paragraphs(4),

  origin: {
    region: faker.location.country(),
    culture: faker.word.noun(),
    timePeriod: `${faker.date.past({ years: 1500 }).getFullYear()} CE`,
    yearEstimated: faker.date.past({ years: 500 }).getFullYear(),
  },

  sources: [
    {
      title: faker.word.words(3),
      author: faker.person.fullName(),
      link: faker.internet.url(),
      publication: faker.company.name(),
      year: faker.date.past({ years: 200 }).getFullYear(),
    },
  ],

  createdBy: createdById,
  category: faker.word.noun(),
  tags: [faker.word.noun(), faker.word.noun(), faker.word.adjective()],

  likes: faker.number.int({ min: 0, max: 500 }),
  dislikes: faker.number.int({ min: 0, max: 100 }),
  views: faker.number.int({ min: 0, max: 100000 }),
  commentCount: faker.number.int({ min: 0, max: 250 }),
});

const makeResources = async (count) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");

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

    const docs = Array.from({ length: count }, () => generateResource(user._id));

    await ResourceMaterial.insertMany(docs);
    console.log(` Successfully inserted ${count} resources`);

    await mongoose.disconnect();
    console.log("  Disconnected from MongoDB");
  } catch (error) {
    console.error("  Error seeding resources:", error);
    process.exit(1);
  }
};

// Run Seeder
makeResources(200);