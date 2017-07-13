import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

enum CommentPrivacy {
    Private,
    Team,
    Global
}

var commentSchema: Schema = new mongoose.Schema({
    content: String,
    privacy: CommentPrivacy,

    parentId: String,
    recipientId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date,
})

interface IComment {
    content: String;
    privacy: CommentPrivacy;

    parentId: String;
    recipientId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
}

interface ICommentModel extends IComment, mongoose.Document {

}


export var Comment: Model<ICommentModel> = mongoose.model<ICommentModel>("Comment", commentSchema);