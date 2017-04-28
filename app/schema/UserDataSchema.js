"use strict";
const mongoose = require("mongoose");
var userDataSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    preferredName: String,
    salutation: String,
    dateOfBirth: String,
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    userId: String,
    createdAt: Date
});
exports.UserData = mongoose.model("UserData", userDataSchema);
//# sourceMappingURL=UserDataSchema.js.map