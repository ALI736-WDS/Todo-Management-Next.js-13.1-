import connectDB from "@/utils/connectDB";
import User from "models/User";
import { getSession } from "next-auth/react";

async function handler(req, res) {
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
  // console.log({ user });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  //Get INF
  //id ro az 2ta mishe gereft vali behtare az query begirim chun file dynamic hast
  const { todoId } = req.query;
  // const { id, status, title, caption } = req.body;
  const { title, caption } = req.body;

  // console.log("Query", req.query);
  // console.log("Body", req.body);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  if (req.method === "PATCH") {
    // console.log("Todo ID:", todoId);
    // console.log("Title:", title);
    // console.log("Caption:", caption);

    if (
      (typeof title === "string" && title.trim() === "") ||
      (typeof caption === "string" && caption.trim() === "")
    ) {
      return res.status(422).json({
        status: "failed",
        message: "Enter the Valid Title or Caption!",
      });
    }

    await User.updateOne(
      { "todos._id": todoId },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.caption": caption,
        },
      }
    );

    res.status(200).json({ status: "success", message: "Todo Updated!" });

    //Raveshe 1 behtare

    //////Raveshe 2 : dastkari va amaliate bishtare todo ha va hazine bishtar
    // const userData = user.todos.find((todo) => todo._id.toString() === todoId);
    // console.log({ userData });
    // userData.title = req.body.title;
    // await userData.save();

    // console.log(result);
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  else if (req.method === "DELETE") {
    // console.log({ todoId });

    const result = await User.updateOne(
      { "todos._id": todoId },
      { $pull: { todos: { _id: todoId } } }
    );
    res
      .status(200)
      .json({ status: "success", message: "Todo Deleted!", data: user });
    // console.log({ result });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Todo not found!" });
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
}

export default handler;
