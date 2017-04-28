"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
let userSchema = new mongoose.Schema({
    login: { type: String, required: true, index: { unique: true } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    boxUserId: String,
    role: String
});
exports.User = mongoose.model("User", userSchema);
userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err2, hash) => {
            if (err) {
                return next(err2);
            }
            user.password = hash;
            next();
        });
    });
});
//# sourceMappingURL=UserSchema.js.map