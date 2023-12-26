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

module.exports = {
  isMobileValid,
  isValidEmail,
};
