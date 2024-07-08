// import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import process from "process";
import njwt from "njwt";
dotenv.config();
// const { sign, verify } = pkg;
// const { create, verify } = njwt;

const secretKey = process.env.JWT_SECRET;

// Function to generate a JWT token
// function generateToken(payload, expiresIn = "1h") {
//   try {
//     return sign(payload, secretKey, { expiresIn });
//   } catch (error) {
//     console.error("Error generating token:", error);
//     throw error;
//   }
// }
function generateToken(payload, expiresIn = "1h") {
  try {
    const jwt = njwt.create(payload, secretKey);
    jwt.setExpiration(new Date().getTime() + expiresIn * 60 * 60 * 1000);
    return jwt.compact();
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
}
// Function to verify a JWT token
// function verifyToken(token) {
//   try {
//     return verify(token, secretKey);
//     // eslint-disable-next-line no-unused-vars
//   } catch (error) {
//     return null;
//   }
// }
function verifyToken(token) {
  try {
    const verifiedJwt = njwt.verify(token, secretKey);
    return verifiedJwt;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
}

export default {
  generateToken,
  verifyToken,
};
