// Import Post Model
const Post = require('./../models/Post');

// Post Seeds
const postData = 
[
    {
        title: "Artificial Intelligence as a Service",
        post_content: "Artificial Intelligence or AI is the most revolutionary technology trend going on. It is a computerized system built to mimic human behavior and intelligence to perform tasks such as image recognition, speech with decision making and finding patterns. AI can do these more accurately and faster than humans!",
        user_id: 1
    },
    {
        title: "IoT - Internet of Things",
        post_content: "This technology trend will also allow better security, efficiency, and decision making for businesses as information is collected and analyzed through the internet. It can enable forecasting maintenance, speed up healthcare, improve customer support service, and benefits for other various industries.",
        user_id: 2
    },
    {
        title: "Augmented Reality",
        post_content: "It is one of the most fascinating top technology trends in recent years. It is something you could only imagine being part of Star Trek! Only now due to advanced innovations its being applied to real-life situations and possibilities.",
        user_id: 3
    },
    {
        title: "Blockchain",
        post_content: "Blockchain has the significant capacity to digitally transform businesses, specifically for the financial institutions. While present in only a few industries right now, by the end of 2021, the world will experience its mass adoption.",
        user_id: 4
    },
    {
        title: "Machine Learning",
        post_content: "ML is capable of turning a vision of self-driving cars into reality, machine learning has already proven to be revolutionary for the transportation industry. Even the most conventional and traditional businesses such as the supply chain have been able to transform to a turbo speed with the help of machine learning.",
        user_id: 5
    }
]

// Bulk create user seeds
const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;