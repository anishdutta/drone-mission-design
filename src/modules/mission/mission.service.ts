  import { UserService } from "../user/user.service";
import { IAddMissionRequest } from "./mission.interface";
import Site from "./mission.model";
  
  export class MissionService {
    userService: UserService;
  
    init() {
      this.userService = new UserService();
    }
  
    async create(request: IAddMissionRequest){
        const response = await Site.create(request);
        return response
    }
  }
  