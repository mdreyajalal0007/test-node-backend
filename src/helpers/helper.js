import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mobile number validation
export const isMobileValid = (mobileNumber) => {
  const cleanedNumber = mobileNumber.toString().replace(/\D/g, "");
  return cleanedNumber.length === 10;
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate password hash
export async function generatePasswordHash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Compare passwords
export async function comparePasswords(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

const secretKey = "mysecrete@dsjhf3sjdhfkjsd878key";

// Generate login token
export async function generateLoginToken(loginData) {
  let token = jwt.sign(
    {
      ...loginData,
    },
    secretKey,
    { expiresIn: "8h" }
  );
  token = `Bearer ${token}`;
  return token;
}

// Verify token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, error: "Invalid token" };
  }
}

// Authenticate token middleware
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
}
