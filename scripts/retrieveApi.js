import axios from "axios";
import {
  AhsFacility,
  AhsInspection,
  AhsViolation,
  connectDatabase,
  disconnectDatabase,
} from "../database.js";

const allFacilities = await AhsFacility.find();

async function getInspections(facilityId) {
  const response = await axios.get(
    "https://ephisahs.microsoftcrmportals.com/getlast3yearsinspectionsbyfacilityid/?facilityid=" +
      facilityId +
      "&&facilitygroup=Food",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "request-id": "|0a4a7a5004b443589096c796272874de.a5c885ba52874758",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        traceparent: "00-0a4a7a5004b443589096c796272874de-a5c885ba52874758-01",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          "",
        Referer:
          "https://ephisahs.microsoftcrmportals.com/facilitydetails/?id=bcae919e-86a0-ec11-b3fe-002248d518b7",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const inspections = response.data.results;

  for (let i = 0; i < inspections.length; i++) {
    const inspection = inspections[i];
    inspection.facilityid = facilityId;
    console.log("Inspections", inspection);
    const newInspection = new AhsInspection(inspection);
    await newInspection.save();
  }
}

await connectDatabase();
const allFacilityIds = allFacilities.map((facility) => facility.facilityid);
for (let i = 0; i < allFacilityIds.length; i++) {
  const facilityId = allFacilityIds[i];
  await getInspections(facilityId);
}
disconnectDatabase();
