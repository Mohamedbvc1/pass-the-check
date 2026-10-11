import express from "express";
import * as DatabaseData from "../database.js";

const router = express.Router();

router.get("/ahsfacility", async (req, res) => {
  const areas = await DatabaseData.getAllRestaurants();
  res.send(areas);
});

// router.get(
//   "/ahsfacility",
//   paginatedResults(DatabaseData.AhsFacility),
//   async (req, res) => {
//     res.json(res.paginatedResults);
//   }
// );

router.get("/ahsfacility/info", async (req, res) => {
  const id = req.query.id;
  const restaurant = await DatabaseData.getRestaurantInformation(id);
  res.send(restaurant);
});

router.get("/ahsfacility/areas", async (req, res) => {
  const areas = await DatabaseData.getAllAreas();

  const sorted = areas.sort((el1, el2) => {
    return el1.name - el2.name;
  });

  res.send(sorted);
});

router.get("/ahsfacility/findByArea", async (req, res) => {
  const area = req.query.area;
  const restaurants = await DatabaseData.getRestaurantsByArea(area);
  res.send(restaurants);
});

router.get("/ahsinspection", async (req, res) => {
  const id = req.query.id;
  const inspections = await DatabaseData.getInspectionByFacilityId(id);
  res.send(inspections);
});

router.get("/ahsviolation", async (req, res) => {
  const id = req.query.id;
  const violations = await DatabaseData.getViolationsByInspectionId(id);
  res.send(violations);
});



router.get("/ahsfacility/findByName", async (req, res) => {
  const name = req.query.name;
  console.log(name);
  const restaurant = await DatabaseData.getRestaurantByname(name);
  res.send(restaurant);
});


function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

export default router;
