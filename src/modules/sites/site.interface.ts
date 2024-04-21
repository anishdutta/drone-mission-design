import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface ISite{
    siteName: string,
    position: ISitePosition,
    drones: ObjectId[],
    missions: ObjectId[]
}

export interface ISitePosition{
    latitude: string,
    longitude: string
}

export interface IAddSiteRequest extends ISite {}

export interface ISiteModel extends Model<ISiteDoc>{};

export interface ISiteDoc extends ISite, Document {}