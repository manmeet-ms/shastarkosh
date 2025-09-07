// seedCategory.js
import { faker } from "@faker-js/faker";
// make sure you installed: npm i @faker-js/faker

import "dotenv/config";
import mongoose from "mongoose";

import Category from "../../backend/models/Category.model.js";

const dbURL = process.env.MONGO_URI || "mongodb://localhost:27017/shastarkosh"; // change to your db

async function seedCategory() {
  try {
    await mongoose.connect(dbURL);
    console.log("✅ Connected to MongoDB");

    const catg = [];

    for (let i = 0; i < 50; i++) {
      // ensure uniqueness

      catg.push({
        name: faker.word.noun(),
        description: faker.lorem.sentence(),
      });
    }

    await Category.insertMany(catg);
    console.log("🎉 Inserted 100 test catg");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding catg:", error);
    process.exit(1);
  }
}

seedCategory();
