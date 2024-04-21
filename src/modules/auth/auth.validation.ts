import Joi from "joi";
import { ILoginUserRequest, IRegisterUserRequest } from "../../modules/user/user.interfaces";

export const register: Record<keyof IRegisterUserRequest, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required()
};

export const login: Record<keyof ILoginUserRequest, any> = {
  email: Joi.string().required(),
  password: Joi.string().required()
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
