"use strict";
const mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    contactId: String,
    accountId: String,
    saleId: String,
    recipientId: String,
    dueDate: String,
    isCompleted: Boolean,
    userId: String,
    createdAt: Date
});
exports.Task = mongoose.model("Task", taskSchema);
//# sourceMappingURL=TaskSchema.js.map