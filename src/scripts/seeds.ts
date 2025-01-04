/** @format */

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const main = async () => {
  try {
    await database.category.createMany({
      data: [
        { name: "Software Development" },
        { name: "Web Development" },
        { name: "Mobile App Development" },
        { name: "UI/UX Design" },
        { name: "Cloud Computing" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(`Error on seeding the database categories : ${error}`);
  }
};

main();
