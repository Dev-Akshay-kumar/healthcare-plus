import mongoose from "mongoose";
import { randomUUID } from "crypto";
// /D:/hms-server/patients/model.js

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    phone: { type: String },
    email: { type: String, lowercase: true, trim: true },
    preferred: {
      type: String,
      enum: ["phone", "email", "none"],
      default: "phone",
    },
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, default: "Country" },
  },
  { _id: false }
);

const EmergencyContactSchema = new Schema(
  {
    name: { type: String },
    relation: { type: String },
    phone: { type: String },
  },
  { _id: false }
);

const MedicationSchema = new Schema(
  {
    name: { type: String, required: true },
    dose: { type: String },
    frequency: { type: String },
  },
  { _id: false }
);

const ImmunizationSchema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
  },
  { _id: false }
);

const PatientSchema = new Schema(
  {
    patientId: {
      type: String,
      unique: true,
      index: true,
      default: () => `P-${randomUUID()}`,
    },
    password: { type: String, required: true, trim: true },

    // Demographics
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other", "undisclosed"],
      default: "undisclosed",
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
      default: "Unknown",
    },

    // Contact & address
    contact: { type: ContactSchema, default: () => ({}) },
    address: { type: AddressSchema, default: () => ({}) },

    // Medical details
    allergies: { type: [String], default: [] },
    chronicConditions: { type: [String], default: [] },
    medications: { type: [MedicationSchema], default: [] },
    immunizations: { type: [ImmunizationSchema], default: [] },

    // Vitals (optional snapshots)
    heightCm: { type: Number },
    weightKg: { type: Number },

    // Administrative
    emergencyContact: { type: EmergencyContactSchema, default: () => ({}) },
    insurance: {
      provider: { type: String },
      policyNumber: { type: String },
      groupNumber: { type: String },
      validUntil: { type: Date },
    },
    primaryDoctor: { type: Schema.Types.ObjectId, ref: "User" },
    visits: [{ type: Schema.Types.ObjectId, ref: "Visit" }],

    notes: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
PatientSchema.virtual("fullName").get(function () {
  return [this.firstName, this.middleName, this.lastName]
    .filter(Boolean)
    .join(" ");
});

PatientSchema.virtual("age").get(function () {
  if (!this.dob) return null;
  const diff = Date.now() - this.dob.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

PatientSchema.virtual("bmi").get(function () {
  if (!this.heightCm || !this.weightKg) return null;
  const heightM = this.heightCm / 100;
  return +(this.weightKg / (heightM * heightM)).toFixed(1);
});

// Indexes
PatientSchema.index({ lastName: 1, firstName: 1 });
PatientSchema.index({ "contact.email": 1 });

// Export model
// module.exports = mongoose.model("Patient", PatientSchema);


const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
