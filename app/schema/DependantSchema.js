"use strict";
const mongoose = require("mongoose");
var dependantSchema = new mongoose.Schema({
    salutation: String,
    preferredName: String,
    dateOfBirth: Date,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    maritalStatus: String,
    nationality: String,
    contactId: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Dependant = mongoose.model("Dependant", dependantSchema);
//# sourceMappingURL=DependantSchema.js.map