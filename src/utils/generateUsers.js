import { faker } from "@faker-js/faker";
import crypto from "crypto";

export const generateUser = () => {
  let numOfProducts = parseInt(
    faker.string.numeric({length: 1, 
      exclude: ["0"]}
    )
  );
  let products = [];
  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProduct());
  }
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    products,
    emailL: faker.internet.email(),
    id: faker.database.mongodbObjectId(),
    jobTitle: faker.person.jobTitle(),
    userRole: randomUserRole(),
    premium: Math.floor(Math.random() * 2) === 1 ? true : false,
  };
};

export const generateProduct = () => {
  return {
    /*title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.string.numeric(1),
    id: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    description: faker.commerce.productDescription(),
    code: crypto.randomBytes(16).toString("hex").substring(0, 10),*/
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: crypto.randomBytes(16).toString("hex").substring(0, 10),
    status: faker.commerce.productAdjective(),
    stock: faker.string.numeric(1),
    category: faker.commerce.department(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
  };
};

export const randomUserRole = () => {
  let roles = ["admin", "user", "guest"];
  return roles[Math.floor(Math.random() * roles.length)];
};