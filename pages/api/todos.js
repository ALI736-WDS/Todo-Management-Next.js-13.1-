import connectDB from "@/utils/connectDB";
import User from "models/User";
import { getSession } from "next-auth/react";

import { sortTodos } from "@/utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting DB!" });
  }

  const session = await getSession({ req });
  // console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  //Get INF
  //dar in file faghat meshe az req.body INF gereft
  const { id, status, title, caption } = req.body;

  // console.log("Query", req.query); //yek {} khali miare
  // console.log("Body", req.body);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
    // console.log("user", user);

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
  } else if (req.method === "POST") {
    // console.log({ title, caption, status });

    if (
      (typeof title === "string" && title.trim() === "") ||
      (typeof caption === "string" && caption.trim() === "")
    ) {
      return res.status(422).json({
        status: "failed",
        message: "Please Enter the Valid Title and Caption and Status!",
      });
    }

    user.todos.push({ title, caption, status });
    user.save();

    res
      .status(201)
      .json({
        status: "success",
        message: "Todo Created Successfully!",
        data: user,
      });
  }
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
}
