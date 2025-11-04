import { model } from "mongoose";
import { Schema } from "mongoose";

const NAME_SCHEMA = {
  first: { type: String, required: true, trim: true },
  middle: { type: String, trim: true },
  last: { type: String, required: true, trim: true },
};

const ADDRESS_SCHEMA = {
  line1: { type: String, required: true, trim: true },
  line2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, trim: true },
  postalCode: { type: String, trim: true },
  country: { type: String, required: true, trim: true },
};

// availability slot time is stored as "HH:mm" (24-hour)
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const SLOT_SCHEMA = new Schema(
  {
    start: { type: String, required: true, match: TIME_REGEX },
    end: { type: String, required: true, match: TIME_REGEX },
  },
  { _id: false }
);

// Example: { day: 'Monday', slots: [{start:'09:00', end:'12:00'}, ...], isAvailable: true }
const AVAILABILITY_DAY_SCHEMA = new Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    isAvailable: { type: Boolean, default: true },
    slots: { type: [SLOT_SCHEMA], default: [] }, // multiple continuous or seperate blocks
    notes: { type: String, trim: true },
  },
  { _id: false }
);

const REVIEW_SCHEMA = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const doctorSchema = new Schema(
  {
    name: NAME_SCHEMA,
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },

    // professional
    specialization: { type: [String], required: true }, // e.g. ["Cardiology"]
    qualifications: { type: [String], default: [] }, // e.g. ["MBBS","MD"]
    registrationNumber: { type: String, trim: true }, // medical license/registration
    yearsOfExperience: { type: Number, min: 0, default: 0 },
    department: { type: String, trim: true },

    // relation to a hospital (can be multiple hospitals if desired)
    hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },

    // contact & location
    address: ADDRESS_SCHEMA,
    profilePicture: { type: String, trim: true }, // url or path
    bio: { type: String, trim: true },
    languages: { type: [String], default: [] },

    // availability & scheduling
    availability: {
      type: [AVAILABILITY_DAY_SCHEMA],
      default: [
        { day: "Sunday", isAvailable: false, slots: [] },
        { day: "Monday", isAvailable: true, slots: [] },
        { day: "Tuesday", isAvailable: true, slots: [] },
        { day: "Wednesday", isAvailable: true, slots: [] },
        { day: "Thursday", isAvailable: true, slots: [] },
        { day: "Friday", isAvailable: true, slots: [] },
        { day: "Saturday", isAvailable: false, slots: [] },
      ],
    },

    consultation: {
      fee: { type: Number, min: 0, default: 0 },
      slotDurationMinutes: { type: Number, min: 5, default: 15 },
      modes: {
        type: [String],
        enum: ["InPerson", "Telemedicine", "HomeVisit"],
        default: ["InPerson"],
      },
    },

    ratings: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, min: 0, default: 0 },
      reviews: { type: [REVIEW_SCHEMA], default: [] },
    },

    isActive: { type: Boolean, default: true },
    meta: { type: Schema.Types.Mixed }, // any additional metadata
  },
  {
    timestamps: true,
  }
);

// Indexes
doctorSchema.index({ email: 1 }, { unique: true, sparse: true });
doctorSchema.index({ phone: 1 }, { unique: true, sparse: true });
doctorSchema.index({ hospital: 1, specialization: 1 });

// Instance helper to check if doctor is available for a given day and time (HH:mm)
doctorSchema.methods.isAvailableAt = function (dayName, timeHHMM) {
  if (!timeHHMM || !TIME_REGEX.test(timeHHMM)) return false;
  const day = (this.availability || []).find((d) => d.day === dayName);
  if (!day || !day.isAvailable) return false;
  for (const s of day.slots || []) {
    if (s.start <= timeHHMM && timeHHMM < s.end) return true;
  }
  return false;
};

// Static helper to normalize time strings if needed (optional)
doctorSchema.statics.validateTime = function (timeStr) {
  return TIME_REGEX.test(timeStr);
};

const Doctor = model("Doctor", doctorSchema);
// const Hospital = model("Hospital", hospitalSchema);

export default Doctor;
