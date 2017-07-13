"use strict";
const mongoose = require("mongoose");
var activitySchema = new mongoose.Schema({
    type: String,
    seen: Boolean,
    parentId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    updatedAt: Date,
});
exports.Activity = mongoose.model("Activity", activitySchema);
//# sourceMappingURL=ActivitySchema.js.map