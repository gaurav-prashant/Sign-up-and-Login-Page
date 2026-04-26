import mongoose from "mongoose";
import { User } from "./models/userModel.js";

const MONGO_URI = "mongodb://gauravprashantkumar26_db_user:qpmnmXbFeGHe6hxY@ac-bqi0hjs-shard-00-00.y85m2k4.mongodb.net:27017,ac-bqi0hjs-shard-00-01.y85m2k4.mongodb.net:27017,ac-bqi0hjs-shard-00-02.y85m2k4.mongodb.net:27017/quickbitenote?ssl=true&replicaSet=atlas-28odxw-shard-0&authSource=admin&retryWrites=true&w=majority";

const clearUser = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const result = await User.deleteOne({ email: "pg96082219@gmail.com" });
        console.log("Deleted user result:", result);
        console.log("Successfully cleared the stuck email from the database!");
        process.exit(0);
    } catch (err) {
        console.error("Error connecting to mongo:", err);
        process.exit(1);
    }
};

clearUser();
