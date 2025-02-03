import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected successfully!"))
    .catch((error) => console.log("Error while Connecting db", error));
};
export default connectDB;
