// Import Seeds
const userSeeds = require("./user-seeds");
const postSeeds = require("./post-seeds");
const commentSeeds = require("./comment-seeds");

// Import Sequelize connection
const sequelize = require("./../config/connection");
const chalk = require("chalk");
const { create } = require("../models/User");

// Create seeds
const createSeeds = async () => {
    await sequelize.sync({force: true});
    console.log(chalk.bold.green("\n----- DATABASE SYNCED -----\n"));

    await userSeeds();
    console.log(chalk.bold.green("\n----- USERS SEEDED -----\n"));

    await postSeeds();
    console.log(chalk.bold.green("\n----- POSTS SEEDED -----\n"));
    
    await commentSeeds();
    console.log(chalk.bold.green("\n----- COMMENTS SEEDED -----\n"));

    process.exit(0);
}

createSeeds();