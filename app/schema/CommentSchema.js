"use strict";
const mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
    content: String,
    commentType: String,
    parentId: String,
    createdAt: Date,
    recipientId: String,
    userId: String
});
exports.Comment = mongoose.model("Comment", commentSchema);
//# sourceMappingURL=CommentSchema.js.map