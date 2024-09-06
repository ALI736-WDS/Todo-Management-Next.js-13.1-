import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";

import connectDB from "@/utils/connectDB";
import User from "models/User";
import {
  emailValidationRegex,
  passwordValidationRegex,
  verifyPassword,
} from "@/utils/auth";

const authOptions = {
  session: { strategy: "jwt" }, //json web token
  providers: [
    credentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials; //email pass ro az signin line 12 migire

        try {
          await connectDB();
        } catch (error) {
          /* dige res nemikhad, yek error dorost mikonim va khode NextAuth tashkhis
          mide va dorosteshun mikone */
          throw new Error("Error in Connecting to DB");
        }

        //Regex Email
        // if (!emailValidationRegex(email)) {
        //   return res.status(422).json({
        //     status: "failed",
        //     message:
        //       "Please enter a valid email address. Example: example@domain.com",
        //   });
        // }

        // //Regex Password
        // if (!passwordValidationRegex(password)) {
        //   return res.status(422).json({
        //     status: "failed",
        //     message:
        //       "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.",
        //   });
        // }

        if (!email || !password) {
          throw new Error("Invalid Data!");
        }

        const user = await User.findOne({ email: email });

        if (!user) throw new Error("User doesn't Exist!");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("Username or Password is incorrect!");

        return { email }; //ba email ya harchizi ezafetar ke behesh bedim, khode NextAuth token misaze
      },
    }),
  ],
};
export default NextAuth(authOptions);
