import {
  AhsFacility,
  AhsInspection,
  AhsViolation,
  connectDatabase,
  disconnectDatabase,
} from "../database.js";

async function blowUpDataBase(model) {
  try {
    await model.deleteMany();
    console.log("Collection emptied successfully.");
  } catch (error) {
    console.error("Error emptying collection:", error);
  }
}
await connectDatabase();
await blowUpDataBase(AhsFacility);
await blowUpDataBase(AhsInspection);
await blowUpDataBase(AhsViolation);
disconnectDatabase();
