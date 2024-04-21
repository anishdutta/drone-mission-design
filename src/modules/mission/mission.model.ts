import mongoose, { Schema } from "mongoose";
import { IMissionDoc, IMissionModel } from "./mission.interface";

const missionSchema = new mongoose.Schema<IMissionDoc, IMissionModel>(
    {
        alt: { type: Number, required: true },
        speed: { type: Number, required: true },
        name: { type: String, required: true },
        waypoints: [{
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        }],
        site: { type: Schema.Types.ObjectId, ref: 'Site', required: true }    
    },
    {
      timestamps: true,
    }
  );

const Mission = mongoose.model<IMissionDoc, IMissionModel>('Mission', missionSchema);

export default Mission;