  import { ObjectId } from "mongodb";
import { UserService } from "../user/user.service";
import { IAddDroneRequest } from "./drone.interface";
import Drone from "./drone.model";
  
  export class DroneService {
    userService: UserService;
  
    init() {
      this.userService = new UserService();
    }
  
    async create(request: IAddDroneRequest){
        const response = await Drone.create(request);
        return response
    }

    async updateSite(siteId: ObjectId, droneId: ObjectId){
      const drone = await Drone.findById(droneId);
      drone.site = siteId;
      await drone.save();
      return drone;
    }
  }
  