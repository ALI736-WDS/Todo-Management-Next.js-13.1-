import { getSession } from "next-auth/react";

import connectDB from "@/utils/connectDB";
import User from "models/User";
import { hashPassword, passwordValidationRegex, verifyPassword } from "@/utils/auth";

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
  if (req.method === "PATCH") {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(422).json({
        status: "failed",
        message:
          "Enter the Valid Old Password or New Password or Confirm New Password!",
      });
    }

    const isValid = await verifyPassword(oldPassword, user.password);

    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "Old Password is incorrect!" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(422).json({
        status: "failed",
        message: "New Password and Confirm Password do not match!",
      });
    }

    //Regex Password
    if (!passwordValidationRegex(password)) {
      return res.status(422).json({
        status: "failed",
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(422).json({
        status: "failed",
        message: "Password and New Password must not be the same!",
      });
    }

    user.password = await hashPassword(newPassword);

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Password is Changed Successfully!",
      // user,
      // data: user.password,
    });
  }
  //end handler
}
