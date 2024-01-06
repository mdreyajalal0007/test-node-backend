const bcrypt = require("bcrypt");
const {jwt,sign} = require("jsonwebtoken");

const isMobileValid = (mobileNumber) => {
  // Remove non-digit characters
  const cleanedNumber = mobileNumber.toString().replace(/\D/g, "");

  // Check if the cleaned number is exactly 10 digits long
  return cleanedNumber.length === 10;
};

const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// function generatePasswordHash(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

async function generatePasswordHash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePasswords(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

const secretKey = "mysecrete@dsjhf3sjdhfkjsd878key"; // Replace with your actual secret key

 async function generateLoginToken(loginData) {
  let token = await sign(
    {
      ...loginData,
    },
    secretKey,
    { expiresIn: "8h" }
  );
  token = `Bearer ${token}`;
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, error: "Invalid token" };
  }
}

module.exports = {
  isMobileValid,
  isValidEmail,
  generatePasswordHash,
  generateLoginToken,
  verifyToken,
  comparePasswords,
};
