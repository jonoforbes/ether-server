"use strict";
var jwt = require("jsonwebtoken");
function handleAuth(req, res) {
    let token = req.header("Authorization").replace("Bearer ", "");
    let error = "error";
    if (!validate(token)) {
        res.status(400).send({ error: "UNAUTHORIZED" });
        console.log("NOT AUTHORISED");
        return error;
    }
    return getUserIdFromToken(token);
}
exports.handleAuth = handleAuth;
function getToken(req) {
    return req.header("Authorization").replace("Bearer ", "");
}
exports.getToken = getToken;
function getUserIdFromToken(token) {
    return jwt.decode(token, "secret")._id;
}
exports.getUserIdFromToken = getUserIdFromToken;
function validate(token) {
    return jwt.verify(token, "secret");
}
exports.validate = validate;
//# sourceMappingURL=auth.js.map