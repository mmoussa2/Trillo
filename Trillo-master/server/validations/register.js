const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  data.name = validText(data.name) ? data.name : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return {
      message: "Email is invalid",
      isValid: false
    };
  }

  if (Validator.isEmpty(data.name)) {
    return {
      message: "Name field is required",
      isValid: false
    };
  }

  if (Validator.isEmpty(data.email)) {
    return {
      message: "Email field is required",
      isValid: false
    };
  }

  if (!Validator.isLength(data.password, { min: 8 })) {
    return {
      message: "Password needs to be at least 8 characters",
      isValid: false
    };
  }

  if (Validator.isEmpty(data.password)) {
    return {
      message: "Password field is required",
      isValid: false
    };
  }

  return {
    message: "",
    isValid: true
  };
};
