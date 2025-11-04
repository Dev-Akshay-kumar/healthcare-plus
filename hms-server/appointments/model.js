import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientName: { type: String, required: true, trim: true },
    consultationMode: {
        type: String,
        enum: ["in-person", "telemedicine"],  // ✅ Updated enum values
        required: true
    },
    issue: { type: String, required: true, trim: true },
    date: { type: Date, required: true },                    // ✅ Renamed
    timeSlot: { type: String, required: true },              // ✅ Renamed
    status: {
        type: String,
        enum: ["scheduled", "completed", "canceled"],
        default: "scheduled"
    },
}, { timestamps: true });

const Appointment = model("Appointment", appointmentSchema);
export default Appointment;