import Joi from "joi";

export const registerSchema = {
  body: Joi.object({
    name: Joi.string().required("Name is required").min(3).max(30),
    email: Joi.string().email({
      tlds: { allow: ["com", "net"] },
      minDomainSegments: 2,
      maxDomainSegments: 3
    }).required("Email is required"),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required("Password is required"),
    role: Joi.string().required("Role is required"),
    gender: Joi.string().required("Gender is required"),
  })
}

export const signInSchema = {
  body: Joi.object({
    email: Joi.string().email({
      tlds: { allow: ["com", "net"] },
      minDomainSegments: 2,
      maxDomainSegments: 3
    }).required("Email is required"),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required("Password is required"),
  })
}

export const updateSchema = {
  body: Joi.object({
    name: Joi.string().required("Name is required").min(3).max(30),
    email: Joi.string().email({
      tlds: { allow: ["com", "net"] },
      minDomainSegments: 2,
      maxDomainSegments: 3
    }).required("Email is required"),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required("Password is required"),
  })
}