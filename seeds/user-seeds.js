// Import User Model
const User = require('./../models/User');

// User Seeds
const userData = 
[
    {
        user_name: "johnDoe",
        email: "johndoe123@example.com",
        password: "password"
    },
    {
        user_name: "jane123",
        email: "jane_smith@example.com",
        password: "password"
    },
    {
        user_name: "nylatheGSD",
        email: "gsdmix@example.com",
        password: "password"
    },
    {
        user_name: "maltipoo_mylo",
        email: "imcute@example.com",
        password: "password"
    },
    {
        user_name: "princess_mella",
        email: "mellathegsd@example.com",
        password: "password"
    }
]

// Bulk create user seeds
const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;