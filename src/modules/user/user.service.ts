import { ObjectId } from "mongodb";
import { ApiHelper, HttpsStatusCode } from "../../utils/utils.interfaces";
import { IAddDroneRequest } from "../drones/drone.interface";
import { IAddSiteRequest } from "../sites/site.interface";
import { SiteService } from "../sites/sites.service";
import {
  IRegisterUserRequest,
  IUserDoc,
} from "./user.interfaces";
import User from "./user.model";
import { DroneService } from "../drones/drone.service";
import { IAddMissionRequest } from "../mission/mission.interface";
import { MissionService } from "../mission/mission.service";

export class UserService {
  /**
   * Get User By Email
   * @param {string} email
   * @returns {Promise<IUserDoc>}
   */
  async getUserByEmail(email: string): Promise<ApiHelper<IUserDoc>> {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return {
        error: "User not found",
        status: HttpsStatusCode.VALIDATION_FAILED,
      };
    }
    console.log(user, user?.toJSON);
    return { response: user, status: HttpsStatusCode.SUCCESS };
  }

  /**
   * Create User
   * @param {string} IRegisterUserRequest
   * @returns {Promise<IUserDoc>}
   */
  async createUser(
    createUserRequest: IRegisterUserRequest
  ): Promise<ApiHelper<IUserDoc>> {
    return (await User.isEmailTaken(createUserRequest.email))
      ? {
          status: HttpsStatusCode.VALIDATION_FAILED,
          error: "Email Already Taken!",
        }
      : {
          status: HttpsStatusCode.SUCCESS,
          response: await User.create(createUserRequest),
        };
  }

  async addSites(userId: string, request: IAddSiteRequest){
    const siteService = new SiteService(), user = await User.findById(userId);
    const response = await siteService.addSites(request);
    user.sites.push(response._id);
    await user.save()
    return response;
  }

  async addDronesInSite(siteId: ObjectId, request: IAddDroneRequest){
    const siteService = new SiteService(), droneService= new DroneService();
    const drone =  await droneService.create(request);
    const site = await siteService.updateDrone(drone._id,siteId);
    return site;
  }

  async addMissionsInSite(siteId: ObjectId, request: IAddMissionRequest){
    const siteService = new SiteService(), missionService= new MissionService();
    const misison =  await missionService.create(request);
    const site = await siteService.updateDrone(misison._id,siteId);
    return site;
  }

  async getSitesForUser(userId: ObjectId) {
        const sites = await User.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$sites' }, // Expand the site array
            {
                $lookup: {
                    from: 'sites', // Name of the sites collection
                    localField: 'sites',
                    foreignField: '_id',
                    as: 'siteInfo'
                }
            },
            { $unwind: '$siteInfo' }, // Deconstruct the array
            { $replaceRoot: { newRoot: '$siteInfo' } } // Replace the root
        ]);

        return sites;
}

async getDronesFromSite(siteId: ObjectId) {
    const siteService = new SiteService();
    return await siteService.getDronesFromSite(siteId);
}

async getMissionsFromSite(siteId: ObjectId) {
    const siteService = new SiteService();
    return await siteService.getMissionsFromSite(siteId);
}

async shiftDroneToNewSite(siteId: ObjectId, droneId:ObjectId){
  const droneService = new DroneService();
  const drone = await droneService.updateSite(siteId,droneId);
  return drone;
}

}
