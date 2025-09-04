import { faker } from "@faker-js/faker";

const replies=new Array(10)
console.log(replies.fill({
          user: faker.string.hexadecimal({ length: 24, casing: "lower" }).replace("0x", ""),
          username: faker.person.fullName(),
          avatar: faker.image.personPortrait({ sex: "female" }),
          text: faker.lorem.lines({ min: 2, max: 5 }),
          likes: faker.number.int(),
          createdAt:faker.date.anytime(),
        },1));

 console.log(replies);
 
        