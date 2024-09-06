import { getSession } from "next-auth/react";

import connectDB from "@/utils/connectDB";
import User from "models/User";
import { passwordValidationRegex, verifyPassword } from "@/utils/auth";

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
      .json({ status: "failed", message: "User doesn't Exist!" });
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      //etelaate kamel ro nes=mishe ba user befrestim vagarne password ham ferestade mishe va (ba inke hash hast) vali nabayad fe fron ersal beshe
      // data: user
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    });

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
  } else if (req.method === "POST") {
    const { name, lastName, password } = req.body;

    //Regex Password
    if (!passwordValidationRegex(password)) {
      return res.status(422).json({
        status: "failed",
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.",
      });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password is incorrect!" });
    }

    //if all info is OK...
    user.name = name;
    user.lastName = lastName;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Profile Updated Successfully!",
      data: { name, lastName, email: session.user.email },
    });

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
  }
}
