"use strict";
const mongoose = require("mongoose");
var contactSchema = new mongoose.Schema({
    salutation: String,
    preferredName: String,
    dateOfBirth: Date,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    maritalStatus: String,
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    primaryEmail: String,
    secondaryEmail: String,
    accountId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Contact = mongoose.model("Contact", contactSchema);
//# sourceMappingURL=ContactSchema.js.map