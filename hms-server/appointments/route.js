import { Router } from "express";
import Appointment from "./model.js";

const appointmentRouter = Router();

appointmentRouter.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

appointmentRouter.get("/patient/:patientId", async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.patientId }).populate('doctorId');
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching patient appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

appointmentRouter.get("/doctor/:doctorId", async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.doctorId });
        res.json(appointments);
    }
    catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

appointmentRouter.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

appointmentRouter.post("/", async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

appointmentRouter.patch("/:id", async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(updatedAppointment);
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

appointmentRouter.delete("/:id", async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default appointmentRouter;