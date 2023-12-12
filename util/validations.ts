import Joi, { ObjectSchema } from 'joi'


export const signUp:ObjectSchema = Joi.object({
    userName: Joi.string().required().messages({
      "string.empty": `user name field cant be blank`,
      "any.required": `user name is require`,
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": `email field cant be blank`,
      "any.required": `email is require`,
      "string.email": `email must be have the user@mail.com format`,
    }),
    password: Joi.string().min(6).required().regex(/[*-]/).messages({
      "string.empty": `password field cant be blank`,
      "any.required": `password is require`,
      "string.min": `password must be have 6 characters at least`,
      "string.pattern.base": `password must be contain at least one these characters *-`,
    }),
    passwordRetry: Joi.string().required().valid(Joi.ref('password')).messages({
      "string.empty": `password confirmation field cant be blank`,
      "any.required": `password confirmation is require`,
      "any.only": `passwords must be the same`,
    }),
  });

  export const signUpServer:ObjectSchema = Joi.object({
    userName: Joi.string().required().messages({
      "string.empty": `user name field cant be blank`,
      "any.required": `user name is require`,
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": `email field cant be blank`,
      "any.required": `email is require`,
      "string.email": `email must be have the user@mail.com format`,
    }),
    password: Joi.string().min(6).required().regex(/[*-]/).messages({
      "string.empty": `password field cant be blank`,
      "any.required": `password is require`,
      "string.min": `password must be have 6 characters at least`,
      "string.pattern.base": `password must be contain at least one these characters *-`,
    }),
  });

  export const login:ObjectSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": `email field cant be blank`,
      "any.required": `email is require`,
      "string.email": `email must be have the user@mail.com format`,
    }),
    password: Joi.string().min(6).required().regex(/[*-]/).messages({
      "string.empty": `password field cant be blank`,
      "any.required": `password is require`,
      "string.min": `password must be have 6 characters at least`,
      "string.pattern.base": `password must be contain at least one these characters *-`,
    }),
  });