import mongoose from "mongoose";
import { ISiteDoc, ISiteModel } from "./site.interface";
import { ObjectId } from "mongodb";

const siteSchema = new mongoose.Schema<ISiteDoc, ISiteModel>(
    {
        siteName:{
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        position:{
            type: Object,
            required: true
        },
        drones: {
            type: Array(ObjectId)
        },
        missions: {
            type: Array(ObjectId)
        }
    },
    {
      timestamps: true,
    }
  );

const Site = mongoose.model<ISiteDoc, ISiteModel>('User', siteSchema);

export default Site;