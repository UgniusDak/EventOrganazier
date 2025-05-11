import registerValidationSchema from "../validationSchemas/registerValidation.js";

export function registerValidation(req, res, next) {
  const { name, lastName, birthDate, email } = req.body;

  const { error } = registerValidationSchema.validate({
    name,
    lastName,
    email,
    birthDate,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
