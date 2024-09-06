import { hash, compare } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
  const hashPassword = hash(password, 12); //12: meghdar 12ta password ro hash kon
  // console.log(hashPassword);

  return hashPassword;
}

async function verifyPassword(password, hashPassword) {
  const isValid = await compare(password, hashPassword); //compare: moghayese 2ta password
  // console.log(isValid);

  return isValid;
}

// function verifyToken(token, secretKey) {
//   try {
//     const result = verify(token, secretKey);
//     console.log(result);
//     return { email: result.email };
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

//Regex Password
function passwordValidationRegex(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/]).{8,}$/;

  return regex.test(password);
}

//Regex Email
function emailValidationRegex(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
}

export {
  hashPassword,
  verifyPassword,
  /*  verifyToken ,*/ passwordValidationRegex,
  emailValidationRegex,
};
