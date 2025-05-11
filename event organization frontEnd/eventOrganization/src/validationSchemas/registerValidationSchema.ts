import * as Yup from "yup";

const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .matches(/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/, "Name must contain only letters")
    .max(12, "Name must be at most 12 characters")
    .required("Name is required"),

  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .matches(
      /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/,
      "Last name must contain only letters"
    )
    .max(15, "Last name must be at most 15 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  birthDate: Yup.date()
    .required("Birth date is required")
    .test("age", "You must be at least 16 years old", function (value) {
      const age = new Date().getFullYear() - value.getFullYear();
      return age >= 16 && age <= 100;
    })
    .typeError("Invalid date format"),
});

export default registerValidationSchema;
