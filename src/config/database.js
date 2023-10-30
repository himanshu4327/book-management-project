const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDatabase;