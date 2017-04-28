"use strict";
const mongoose = require("mongoose");
var clientAccountSchema = new mongoose.Schema({
    accountName: String,
    accountStatus: String,
    companyFullName: String,
    companyNumber: String,
    createdAt: Date,
    userId: String
});
exports.ClientAccount = mongoose.model("ClientAccount", clientAccountSchema);
//# sourceMappingURL=ClientAccountSchema.js.map