"use strict";
const mongoose = require("mongoose");
var activitySchema = new mongoose.Schema({
    header: { type: String, required: true },
    content: { type: String, required: true },
    type: String,
    messageId: String,
    taskId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    seen: Boolean
});
exports.Activity = mongoose.model("Activity", activitySchema);
//# sourceMappingURL=ActivitySchema.js.map