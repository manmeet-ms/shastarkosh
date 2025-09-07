import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import Category from "../../backend/models/Category.model.js";
import ForumPost from "../../backend/models/ForumPost.model.js";
import User from "../../backend/models/User.model.js";

const vstatus = ["active", "deleted", "reported"];

const makeShastars = async (numberOfShastars) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");

    for (let index = 0; index < numberOfShastars; index++) {
      const getRandomAuthorFromDb = await User.aggregate().sample(1);
      const authorId = getRandomAuthorFromDb[0]._id;
      const getRandomCategoryFromDb = await Category.aggregate().sample(1);
      const categoryId = getRandomCategoryFromDb[0]._id;
      await ForumPost.create({
        title: `${index}. ${faker.lorem.lines(1)}`,
        content: faker.lorem.paragraphs({ min: 1, max: 5 }),
        author: authorId,
        category: faker.lorem.word(),
        tags: faker.word.adjective(),
        upvotes: faker.number.int({ min: 12, max: 569 }),
        downvotes: faker.number.int({ min: 12, max: 569 }),
        views: faker.number.int({ min: 12, max: 8600 }),
        isPinned: faker.datatype.boolean(),
        status: vstatus[Math.floor(Math.random() * 3)],
      });
    }
    console.log(` Successfully inserted ${numberOfShastars} shastars`);

    await mongoose.disconnect();
    console.log("  Disconnected from MongoDB");
  } catch (error) {
    console.error("  Error seeding shastars:", error);
    process.exit(1);
  }
};

// Run Seeder
makeShastars(111);
