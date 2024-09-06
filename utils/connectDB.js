  import mongoose from "mongoose";

  async function connectDB() {
    //try catch az inja bardashtim va dar file(data/index) gozashtim
    // try {
    if (mongoose.connections[0].readyState) return;
    // console.log(mongoose.connections);

    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To DataBase");
    // } catch (error) {
    // console.log("Connection Failed", error);
    // }
  }

  export default connectDB;
