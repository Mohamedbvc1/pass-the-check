import mongoose, { Schema } from "mongoose";

let connection = mongoose.connect("mongodb://localhost:27017/ickoMeter");

const AhsFacilitySchema = new Schema({
  facilityid: String,
  name: String,
  address: String,
  area: String,
  category: String,
});

export const AhsFacility = mongoose.model("ahsFacility", AhsFacilitySchema);

const AhsInspectionSchema = new Schema({
  facilityid: String,
  inspectionid: String,
  inspectiondate: Date,
  actiontaken: String,
});

export const AhsInspection = mongoose.model(
  "ahsInspection",
  AhsInspectionSchema
);

const AhsViolationSchema = new Schema({
  facilityid: String,
  inspectionid: String,
  complianceid: String,
  inspectiondate: Date,
  question: String,
  responsecomment: String,
  critical: String,
  comments: String,
  status: String,
  category: String,
});

export const AhsViolation = mongoose.model("ahsViolation", AhsViolationSchema);

export async function connectDatabase() {
  await connection;
}

export async function getAllRestaurants() {
  return await AhsFacility.find();
}

export async function getAllAreas() {
  return await AhsFacility.find().distinct("area");
}

export async function getRestaurantsByArea(area) {
  return await AhsFacility.find({ area });
}

export async function getInspectionByFacilityId(facilityid) {
  return await AhsInspection.find({ facilityid });
}

export async function getViolationsByInspectionId(inspectionid) {
  return await AhsViolation.find({ inspectionid });
}

export async function getRestaurantInformation(facilityid) {
  return await AhsFacility.find({ facilityid });
}



export async function getRestaurantByname(nameFragment) {
  const tmpstr = new RegExp(`.*${nameFragment}.*`, "i")
  console.log(tmpstr);
  return await AhsFacility.find({ name:tmpstr });
}


export function disconnectDatabase() {
  mongoose.disconnect();
}
