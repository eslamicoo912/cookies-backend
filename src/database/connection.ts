import { connect, disconnect } from "mongoose";

const connectDB = async () => {
  try {
    const connectionLink: string = process.env.DB_URL_CONNECTION || "";
    await connect(connectionLink);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
    throw new Error("Error connecting to database");
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Error disconnecting from database");
  }
};

export default connectDB;
