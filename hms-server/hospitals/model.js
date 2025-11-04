import { Schema, model } from "mongoose";

const hospitalSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true }, // keep as string for formatting/+/extension
    email: { type: String, trim: true },
    image: { type: String, trim: true },
    description: { type: String, trim: true },
    services: [{ type: String }], // e.g. ["ER", "ICU", "Maternity"]
    beds: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    openHours: {
      // optional structured hours
      weekdays: { type: String }, // e.g. "08:00-20:00"
      weekend: { type: String },
    },
    emergency: { type: Boolean, default: false },
    contactPerson: { name: String, phone: String },
    // GeoJSON Point for geospatial queries (coordinates: [lng, lat])
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            return Array.isArray(v) && v.length === 2;
          },
          message: "location.coordinates must be [lng, lat]",
        },
      },
    },
  },
  { timestamps: true }
);

// Create 2dsphere index for geospatial queries
hospitalSchema.index({ location: "2dsphere" });

// Static helper to find nearest hospitals
hospitalSchema.statics.findNearby = function (
  lng,
  lat,
  maxDistance = 5000,
  limit = 10
) {
  // maxDistance is in meters
  return this.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distance", // meters
        spherical: true,
        maxDistance,
      },
    },
    { $limit: limit },
  ]);
};

// Optional: convenience instance method to set location from lat/lng
hospitalSchema.methods.setLocation = function (lat, lng) {
  this.location = { type: "Point", coordinates: [lng, lat] };
  return this;
};

const Hospital = model("Hospital", hospitalSchema);

export default Hospital;
