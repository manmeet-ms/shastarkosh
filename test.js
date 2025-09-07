import bcrypt from "bcryptjs";

async function makehash(params) {
  return (await bcrypt.hash(params, 10));
}

console.log(makehash("skdjfhkshdf"));
