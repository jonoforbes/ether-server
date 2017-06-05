import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var commentSchema: Schema = new mongoose.Schema({
    content: String,
    parentId: String,
    createdAt: Date,
    recipientId: String,
    userId: String
})

interface IComment {
    content: String,
    parentId: String,
    createdAt: Date,
    recipientId: String,
    userId: String
}

interface ICommentModel extends IComment, mongoose.Document {

}

export var Comment: Model<ICommentModel> = mongoose.model<ICommentModel>("Comment", commentSchema);