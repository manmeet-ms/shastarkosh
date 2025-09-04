// seedUsers.js
import { faker } from "@faker-js/faker";
// make sure you installed: npm i @faker-js/faker
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "../../backend/models/User.model.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/test"; // change to your db

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = [];

    for (let i = 0; i < 100; i++) {
      const username = faker.internet.username().toLowerCase() + i; // ensure uniqueness
      const email = faker.internet.email(username).toLowerCase();
      const discordId = faker.string.alphanumeric(18); // mimic discord snowflake
      const password = await bcrypt.hash("password123", 10);

      users.push({
        username,
        name: faker.person.fullName(),
        email,
        points: faker.number.int({ min: -90, max: 3950, multipleOf: 5 }),

        password,
        avatar: faker.image.personPortrait(),
        role: "user",
        isVerified: faker.datatype.boolean(),
        verificationToken: faker.string.uuid(),
        resetPasswordToken: null,
        resetPasswordTokenExpires: null,
        provider: {
          discord: {
            discordId,
          },
        },
      });
    }

    await User.insertMany(users);
    console.log("🎉 Inserted 100 test users");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
}

seedUsers();
