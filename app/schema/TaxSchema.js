"use strict";
const mongoose = require("mongoose");
var taxSchema = new mongoose.Schema({
    rate: Number,
    residentCountry: String,
    domicileCountry: String,
    residenceDate: Date,
    number: Number,
    willChange: Boolean,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Tax = mongoose.model("Tax", taxSchema);
//# sourceMappingURL=TaxSchema.js.map