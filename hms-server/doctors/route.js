import { Router } from "express";
import Doctor from "./model.js";
import { Schema } from "mongoose";

const doctorRouter = Router();

doctorRouter.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
doctorRouter.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }


    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  }
  catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

doctorRouter.post("/", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(400).json({ error: error.message });
  }
});

export default doctorRouter;
