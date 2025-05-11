import Joi from "joi";

const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(12).required().messages({
    "string.base": "Name must to be a string",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name is too long, must be 12 characters or less",
    "any.required": "Username is required.",
  }),
  lastName: Joi.string().min(3).max(15).required().messages({
    "string.base": "Last name must be a string",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name is too long, must be 15 characters or less",
    "any.required": "Last name is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required.",
  }),
  birthDate: Joi.date()
    .messages({
      "date.base": "Birth date must be a valid date",
      "any.required": "Birth date is required.",
    })
    .custom((value, helper) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 16 || age > 100) {
        return helper.message(
          "You must be at least 16 years old and not older than 100 years"
        );
      }
      return value;
    }),
});

export default registerValidationSchema;
