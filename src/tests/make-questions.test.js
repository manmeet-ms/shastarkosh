import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import ForumPost from "../../backend/models/ForumPost.model.js";

const vstatus = ["active", "deleted", "reported"];
const forumPosts = () => ({
  title: faker.lorem.lines(1),
  content: faker.lorem.paragraphs(2),
  author: faker.string.hexadecimal({ length: 24, casing: "lower" }).replace("0x", ""),
  category: faker.string.hexadecimal({ length: 24, casing: "lower" }).replace("0x", ""),
  tags: faker.word.adjective(),
  upvotes: faker.number.int({ min: 12, max: 569 }),
  downvotes: faker.number.int({ min: 12, max: 569 }),
  views: faker.number.int(),
  isPinned: faker.datatype.boolean(),
  status: vstatus[Math.floor(Math.random() * 3)],
});
const makeShastars = async (numberOfShastars) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");

    const shastars = Array.from({ length: numberOfShastars }, () => forumPosts());

    await ForumPost.insertMany(shastars);
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
