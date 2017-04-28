import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var noteSchema: Schema = new mongoose.Schema({
    content: {type: String, required: true},
    userId: String,

})

interface INoteModel extends INote, mongoose.Document{
}

interface INote {
    content: String;
    userId: String;

}




export var Note: Model<INoteModel> = mongoose.model<INoteModel>("Note", noteSchema);

