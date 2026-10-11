import axios from "axios";
import {
  AhsFacility,
  AhsInspection,
  AhsViolation,
  connectDatabase,
  disconnectDatabase,
} from "../database.js";

const allViolations = await AhsInspection.find();

async function getViolations(inspectionId) {
  const response = await axios.get(
    "https://ephisahs.microsoftcrmportals.com/getviolationsandcommentsbyinspectionid/?inspectionid=" +
      inspectionId,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "request-id": "|d7f46fa174174aac9d29c787d43ae753.7dd40e796f5749fd",
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        traceparent: "00-d7f46fa174174aac9d29c787d43ae753-7dd40e796f5749fd-01",
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

  const violations = response.data.results;
  console.log(response.data);
  for (let i = 0; i < violations.length; i++) {
    const violation = violations[i];
    violation.inspectionid = inspectionId;
    // console.log("Violation", violation);
    const newViolation = new AhsViolation(violation);
    await newViolation.save();
  }
}

await connectDatabase();
console.log(allViolations.length);
const getAllViolations = allViolations.map(
  (violations) => violations.inspectionid
);
for (let i = 0; i < getAllViolations.length; i++) {
  const inspectionId = getAllViolations[i];
  await getViolations(inspectionId);
}

disconnectDatabase();
