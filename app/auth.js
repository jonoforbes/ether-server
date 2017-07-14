"use strict";
const SECRET = process.env.ETHER_APP_SECRET;
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
    return jwt.decode(token, SECRET)._id;
}
exports.getUserIdFromToken = getUserIdFromToken;
function validate(token) {
    return jwt.verify(token, SECRET);
}
exports.validate = validate;
//# sourceMappingURL=auth.js.map