import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import process from "process";
dotenv.config();
const { sign, verify } = pkg;
const secretKey = process.env.JWT_SECRET;

// Function to generate a JWT token
function generateToken(payload, expiresIn = "1h") {
  try {
    return sign(payload, secretKey, { expiresIn });
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    return verify(token, secretKey);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
}

export default {
  generateToken,
  verifyToken,
};
