import { HttpsStatusCode } from "../../utils/utils.interfaces";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { sanitizeError, verifyToken } from "src/utils/utils";

export const addSites = async (req: Request, res: Response) => {
  try {
    const request = req.body;
    const user = await verifyToken(request.token);
    const userService = new UserService();
    const response = userService.addSites(user.id,request);
    res.status(HttpsStatusCode.SUCCESS).send({response});
  } catch (err) {
    console.error("Error in followUser", err);
    res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send(sanitizeError(err));
  }
};
