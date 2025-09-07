import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import ForumPost from "../../backend/models/ForumPost.model.js";
import User from "../../backend/models/User.model.js";
import Category from "../../backend/models/Category.model.js";

const user=User.aggregate().sample(1)._id
console.log(user);
