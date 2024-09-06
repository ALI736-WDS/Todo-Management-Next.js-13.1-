import connectDB from "@/utils/connectDB";
import User from "models/User";
import { getSession } from "next-auth/react";

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
  const { todoId } = req.query;
  const { status, title, caption } = req.body;

  // console.log("Query", req.query);
  // console.log("Body", req.body);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  if (!todoId || !status) {
    // console.log({ todoId, status });
    return res.status(422).json({
      status: "failed",
      message: "Invalid Data and Status not Changed!",
    });
  }
  res.status(200).json({ status: "success", message: "Status Updated!" });

  // Performing the update operation here
  await User.updateOne(
    { "todos._id": todoId },
    {
      $set: {
        "todos.$.status": status,
      },
    }
  );
}
