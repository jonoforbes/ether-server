"use strict";
const mongoose = require("mongoose");
var appointmentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    invitees: [{ type: String }],
    contactId: String,
    saleId: String,
    accountId: String,
    userId: String,
    createdAt: Date
});
exports.Appointment = mongoose.model("Appointment", appointmentSchema);
//# sourceMappingURL=AppointmentSchema.js.map