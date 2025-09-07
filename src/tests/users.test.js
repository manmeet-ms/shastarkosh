// seedUsers.js
import { faker } from "@faker-js/faker";
// make sure you installed: npm i @faker-js/faker
import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose from "mongoose";

import User from "../../backend/models/User.model.js";

const dbURL = process.env.MONGO_URI || "mongodb://localhost:27017/shastarkosh"; // change to your db

async function seedUsers() {
  try {
    await mongoose.connect(dbURL);
    console.log("✅ Connected to MongoDB");

    const users = [];
    const password = await bcrypt.hash("password123", 10);

    for (let i = 0; i < 100; i++) {
       // ensure uniqueness
       const username =faker.internet.username().toLowerCase() + i;
       
       users.push({
        username,
         email:faker.internet.email(username).toLowerCase(),
        name: faker.person.fullName(),
       password,
        points: faker.number.int({ min: -90, max: 3950, multipleOf: 5 }),

     
        avatar: faker.image.personPortrait(),
        role: "user",
        isVerified: faker.datatype.boolean(),
        verificationToken: faker.string.uuid(),
        resetPasswordToken: null,
        resetPasswordTokenExpires: null,
          
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
