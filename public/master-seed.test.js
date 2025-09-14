console.time('Master Seeding Round'); // Start a timer labeled 'Master Seeding Round'
// seed.js
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

// ====== IMPORT SCHEMAS ======
import Category from "../backend/models/Category.model.js";
import Comment from "../backend/models/Comments.model.js";
import ForumPost from "../backend/models/ForumPost.model.js";
import ResourceMaterial from "../backend/models/ResourceMaterial.model.js";
import ShastarInfo from "../backend/models/ShastarInfo.model.js";
import User from "../backend/models/User.model.js";
import SparkMD5 from "spark-md5";
import logger from "../src/utils/logger.utils.js";
import 'dotenv/config'

// ====== DB CONNECTION ======
console.log(process.env.MONGO_URI);

await mongoose.connect(process.env.MONGO_URI);
logger("log","✅ Connected to DB");
  
// ====== HELPERS ======
function randomArray(arr, count = 3) {
  return Array.from({ length: count }, () => faker.helpers.arrayElement(arr));
}

function fakeObjectId() {
  return new mongoose.Types.ObjectId();
}

// ====== SEED FUNCTIONS ======
async function seedUsers(count) {
 
  const users = Array.from({ length: count }, () => ({
    username: faker.internet.username(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(["user", "moderator", "admin"]),
    avatar: faker.image.avatar(),
    bio: faker.lorem.sentence(),
    isVerified: faker.datatype.boolean(),
  }));
  return User.insertMany(users);
}

async function seedCategories(count) {
  let categories=[]
  const catgNames= faker.helpers.uniqueArray(faker.word.noun, count);
  for (let i = 0; i < catgNames.length; i++) {
    const ctnm = catgNames[i];
    const docCon={
     name: ctnm,
      description: faker.lorem.sentence(),
      slug: faker.helpers.slugify(ctnm).toLowerCase(),
    }
categories.push(docCon)
  }
  
  return await Category.insertMany(categories);
}

async function seedForumPosts(count, users, categories) {
  const posts = Array.from({ length: count }, () => ({
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraphs({ min: 8, max: 21 }),
    author: faker.helpers.arrayElement(users)._id,
    category: faker.helpers.arrayElement(categories)._id,
    tags: faker.lorem.words(3).split(" "),
    upvotes: faker.number.int({ min: 0, max: 500 }),
    downvotes: faker.number.int({ min: 0, max: 200 }),
    viewCount: faker.number.int({ min: 0, max: 10000 }),
    commentCount: faker.number.int({ min: 0, max: 50 }),
    isPinned: faker.datatype.boolean(),
    status: faker.helpers.arrayElement(["active", "deleted", "reported"]),
  }));
  return ForumPost.insertMany(posts);
}

async function seedComments(count, users, forumPosts, shastars, resources) {
  const discussionTargets = [
    { type: "ForumPost", docs: forumPosts },
    { type: "ShastarInfo", docs: shastars },
    { type: "ResourceMaterial", docs: resources },
  ];

  const comments = Array.from({ length: count }, () => {
    const { type, docs } = faker.helpers.arrayElement(discussionTargets);
    const target = faker.helpers.arrayElement(docs);

    // Pick a user and embed their info
    const user = faker.helpers.arrayElement(users);

    return {
      content: faker.lorem.sentences(2),
      author: {
        name: user.name || faker.person.fullName(),
        username: user.username || faker.internet.userName(),
        avatar: user.avatar || faker.image.avatar(),
      },
      discussionType: type,
      discussionId: target._id,
      parentComment: null,
      upvotes: faker.number.int({ min: 0, max: 100 }),
      downvotes: faker.number.int({ min: 0, max: 50 }),
      isReported: faker.datatype.boolean(),
      status: faker.helpers.arrayElement(["active", "edited", "deleted"]),
    };
  });
 
  return Comment.insertMany(comments);
}

async function seedResourceMaterials(count, users, categories) {
  const resources = Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(5),
    mainImage: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.internet.email()))}?d=retro`,
      images: [
        `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({min:50,max:896})))}?d=retro`,
        `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({min:50,max:896})))}?d=retro`,
        `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({min:50,max:896})))}?d=retro`
      ],
    description: faker.lorem.paragraphs({ min: 8, max: 21}),
    origin: {
      region: faker.location.country(),
      culture: faker.word.noun(),
      timePeriod: faker.date.past().getFullYear() + " CE",
      yearEstimated: faker.number.int({ min: 500, max: 1900 }),
    },
    sources: [
      {
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        link: faker.internet.url(),
        publication: faker.company.name(),
        year: faker.number.int({ min: 1800, max: 2023 }),
      },
    ],
    createdBy: faker.helpers.arrayElement(users)._id,
    categories: [faker.helpers.arrayElement(categories)._id],
    tags: faker.lorem.words(3).split(" "),
    likes: faker.number.int(500),
    dislikes: faker.number.int(200),
    views: faker.number.int(10000),
    commentCount: faker.number.int(50),
    reported: faker.datatype.boolean(),
  }));

  return ResourceMaterial.insertMany(resources);
}

async function seedShastars(count, users, categories) {
  const shastars = Array.from({ length: count }, () => ({
    title: faker.lorem.word(),
    alternativeNames: [faker.word.noun(), faker.word.adjective()],
    mainImage: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.internet.email()))}?d=retro`,
      images: [
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({min:50,max:896})))}?d=retro`,
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({min:50,max:896})))}?d=retro`,
    `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({min:50,max:896})))}?d=retro`
  ],
    description: faker.lorem.paragraphs( {min: 8, max: 21}),
    type: faker.helpers.arrayElement([
      "weapon",
      "tool",
      "armor",
      "manuscript",
      "artifact",
    ]),
    subType: faker.word.noun(),
    material: faker.commerce.productMaterial(),
    weight: `${faker.number.float({ min: 0.5, max: 5, precision: 0.1 })} kg`,
    length: `${faker.number.int({ min: 30, max: 200 })} cm`,
    usage: randomArray(["melee", "ranged", "ritual", "healing"], 2),
    origin: {
      region: faker.location.country(),
      culture: faker.word.noun(),
      timePeriod: faker.date.past().getFullYear() + " CE",
      yearEstimated: faker.number.int({ min: 500, max: 1900 }),
    },
    sources: [
      {
        title: faker.lorem.words(2),
        author: faker.person.fullName(),
        link: faker.internet.url(),
        publication: faker.company.name(),
        year: faker.number.int({ min: 1700, max: 2023 }),
      },
    ],
    likes: faker.number.int(200),
    dislikes: faker.number.int(100),
    views: faker.number.int(5000),
    commentCount: faker.number.int(50),
    createdBy: faker.helpers.arrayElement(users)._id,
    reported: faker.datatype.boolean(),
    categories: [faker.helpers.arrayElement(categories)._id],
    tags: faker.lorem.words(3).split(" "),
  }));

  return ShastarInfo.insertMany(shastars);
}

// ====== MASTER SEED ======
async function seedAll() {
  await mongoose.connection.dropDatabase();

  // const users = await seedUsers(5);
  // const categories = await seedCategories(5);
  // const forumPosts = await seedForumPosts(5, users, categories);
  // const resources = await seedResourceMaterials(5, users, categories);
  // const shastars = await seedShastars(5, users, categories);
  const users = await seedUsers(50);
  const categories = await seedCategories(20);
  const forumPosts = await seedForumPosts(800, users, categories);
  const resources = await seedResourceMaterials(350, users, categories);
  const shastars = await seedShastars(405, users, categories);
  await seedComments(5100, users, forumPosts, shastars, resources);

  logger("log","✅ Seeding complete!");
  process.exit(0);
}

seedAll().catch((err) => {
  logger("error","❌ Seeding error:", err);
  process.exit(1);
}); 

console.timeEnd('Master Seeding Round'); // Start a timer labeled 'Master Seeding Round'
