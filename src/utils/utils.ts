import { CustomHelpers } from "joi";
import { TokenService } from "src/modules/token/toke.service";
import { UserService } from "src/modules/user/user.service";
import { HttpsStatusCode } from "./utils.interfaces";

export const password = (value: string, helpers: CustomHelpers) => {
    if (value.length < 8) {
      return helpers.message({ custom: 'password must be at least 8 characters' });
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message({ custom: 'password must contain at least 1 letter and 1 number' });
    }
    return value;
  };

export const verifyToken = async (token: string)=>{
  const tokenService = new TokenService();
  const tokenUser = await tokenService.verifyToken(token);
  if (!tokenUser) {
    throw new Error('Invalid Token!');
  }
  return tokenUser;
}

export const sanitizeError = (error: any)=>{
  return {
    status: HttpsStatusCode.SOMETHING_WENT_WRONG,
    error:
      Object.keys(error).length > 0
        ? error
        : JSON.stringify(error) ||
          "Something Went Wrong, Please Try Again Later.",
  }
}