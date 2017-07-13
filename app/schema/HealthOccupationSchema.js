"use strict";
const mongoose = require("mongoose");
var healthOccupationSchema = new mongoose.Schema({
    dateOfDeath: Date,
    smoker: Boolean,
    goodHealth: Boolean,
    medicalConditions: Boolean,
    occupation: String,
    occupationTitle: String,
    occupationStatus: String,
    employerName: String,
    timeInOccupation: String,
    timeInJob: String,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.HealthOccupation = mongoose.model("HealthOccupation", healthOccupationSchema);
//# sourceMappingURL=HealthOccupationSchema.js.map