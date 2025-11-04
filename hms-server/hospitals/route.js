import { Router } from "express";
import Hospital from "./model.js";

const hospitalRouter = Router();

hospitalRouter.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    if (hospitals.length === 0) {
      return res.status(404).json({ message: "No hospitals found" });
    }
    res.json(hospitals);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

hospitalRouter.post("/", async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
hospitalRouter.get("/nearby", async (req, res) => {
  const { lng, lat, maxDistance, limit } = req.query;
  if (!lng || !lat) {
    return res
      .status(400)
      .json({ error: "lng and lat query parameters are required" });
  }
  try {
    const hospitals = await Hospital.findNearby(
      parseFloat(lng),
      parseFloat(lat),
      maxDistance ? parseInt(maxDistance) : undefined,
      limit ? parseInt(limit) : undefined
    );
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

hospitalRouter.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(hospital);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default hospitalRouter;
