"use strict";
const mongoose = require("mongoose");
var notificationSchema = new mongoose.Schema({
    header: { type: String, required: true },
    content: { type: String, required: true },
    messageId: String,
    taskId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    seen: Boolean
});
exports.Notification = mongoose.model("Notification", notificationSchema);
//# sourceMappingURL=NotificationSchema.js.map