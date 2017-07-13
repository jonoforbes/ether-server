import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var activitySchema: Schema = new mongoose.Schema({

    type: String,
    seen: Boolean,

    parentId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    updatedAt: Date,
})

interface IActivityModel extends IActivity, mongoose.Document {

}

interface IActivity {

    type: String;
    seen: Boolean;

    parentId: String;
    userId: String;
    recipientId: String;
    createdAt: Date;
    updatedAt: Date;
}

export var Activity: Model<IActivityModel> = mongoose.model<IActivityModel>("Activity", activitySchema);