  import { ObjectId } from "mongodb";
import { UserService } from "../../modules/user/user.service";
import { IAddSiteRequest } from "./site.interface";
import Site from "./site.model";
  
  export class SiteService {
    userService: UserService;
  
    init() {
      this.userService = new UserService();
    }
  
    async addSites(request: IAddSiteRequest){
        const response = await Site.create(request);
        return response
    }

    async updateDrone(droneId: ObjectId, siteId: ObjectId){
        const site = await Site.findById(siteId);
        site.drones.push(droneId);
        await site.save();
        return site;
    }

    async updateMission(missionId: ObjectId, siteId: ObjectId){
        const site = await Site.findById(siteId);
        site.missions.push(missionId);
        await site.save();
        return site;
    }

    async getDronesFromSite(siteId:ObjectId){
        const sites = await Site.aggregate([
            { $match: { _id: siteId } },
            { $unwind: '$drones' }, // Expand the drones array
            {
                $lookup: {
                    from: 'drones',
                    localField: 'drones',
                    foreignField: '_id',
                    as: 'droneInfo'
                }
            },
            { $unwind: '$droneInfo' }, // Deconstruct the array
            { $replaceRoot: { newRoot: '$droneInfo' } } // Replace the root
        ]);
        return sites
    }

    async getMissionsFromSite(siteId:ObjectId){
        const sites = await Site.aggregate([
            { $match: { _id: siteId } },
            { $unwind: '$missions' }, // Expand the missions array
            {
                $lookup: {
                    from: 'missions',
                    localField: 'missions',
                    foreignField: '_id',
                    as: 'missionInfo'
                }
            },
            { $unwind: '$missionInfo' }, // Deconstruct the array
            { $replaceRoot: { newRoot: '$missionInfo' } } // Replace the root
        ]);
        return sites
    }
  }
  