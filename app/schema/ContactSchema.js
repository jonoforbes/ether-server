"use strict";
const mongoose = require("mongoose");
var contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: String,
    preferredName: String,
    salutation: String,
    dateOfBirth: String,
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    accountId: String,
    userId: String
});
exports.Contact = mongoose.model("Contact", contactSchema);
//# sourceMappingURL=ContactSchema.js.map