import connectDB from "@/utils/connectDB";
import User from "models/User";
import {
  emailValidationRegex,
  hashPassword,
  passwordValidationRegex,
} from "utils/auth";

async function signUp(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting DB!" });
  }

  const { email, password } = req.body;

  //Regex Email
  if (!emailValidationRegex(email)) {
    return res.status(422).json({
      status: "failed",
      message:
        "Please enter a valid email address. Example: example@domain.com",
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

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "User Exists Already" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });
  // console.log(newUser);

  res.status(201).json({
    status: "success",
    message: "You Register Successfully!",
    newUser,
  });
}

export default signUp;
