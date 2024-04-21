import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface IMission{
    alt: number,
    speed: number,
    name: string,
    waypoints:IMissionWaypoints[],
    site: ObjectId
}

export interface IMissionWaypoints{
    alt: number,
    lat: number,
    long: number
}

export interface ISitePosition{
    latitude: string,
    longitude: string
}

export interface IAddMissionRequest extends IMission {}

export interface IMissionDoc extends IMission, Document {}

export interface IMissionModel extends Model<IMissionDoc>{};