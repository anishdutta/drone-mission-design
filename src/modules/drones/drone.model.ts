import mongoose, { Schema } from "mongoose";
import { IDroneDoc, IDroneModel, IDroneType } from "./drone.interface";

const droneSchema = new mongoose.Schema<IDroneDoc, IDroneModel>(
    {
        name: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        deletedOn: { type: Date },
        droneType: { type: String, enum: Object.values(IDroneType), required: true },
        site: { type: Schema.Types.ObjectId, ref: 'Site', required: true }    
    },
    {
      timestamps: true,
    }
  );

const Drone = mongoose.model<IDroneDoc, IDroneModel>('Drone', droneSchema);

export default Drone;