import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface IDrone{
    name: string
    createdAt: Date,
    updatedAt: Date
    deletedBy: ObjectId,
    deletedOn: Date,
    droneType: IDroneType,
    site: ObjectId
}

export enum IDroneType{
    REAL = 'Real Drone'
}

export interface IAddDroneRequest extends IDrone {}

export interface IDroneModel extends Model<IDroneDoc>{};

export interface IDroneDoc extends IDrone, Document {}