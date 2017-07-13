"use strict";
const mongoose = require("mongoose");
var CommentPrivacy;
(function (CommentPrivacy) {
    CommentPrivacy[CommentPrivacy["Private"] = 0] = "Private";
    CommentPrivacy[CommentPrivacy["Team"] = 1] = "Team";
    CommentPrivacy[CommentPrivacy["Global"] = 2] = "Global";
})(CommentPrivacy || (CommentPrivacy = {}));
var commentSchema = new mongoose.Schema({
    content: String,
    privacy: Number,
    parentId: String,
    recipientId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date,
});
exports.Comment = mongoose.model("Comment", commentSchema);
//# sourceMappingURL=CommentSchema.js.map