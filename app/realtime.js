"use strict";
const index_1 = require("./index");
const auth_1 = require("./auth");
const UserSchema_1 = require("./schema/UserSchema");
var jwt = require("jsonwebtoken");
function handleRt(userId, req, action) {
    if (!index_1.clientIdsMap[userId]) {
        return;
    }
    index_1.clientIdsMap[userId]
        .filter((clientInfo) => {
        return clientInfo.jwtToken !== auth_1.getToken(req);
    })
        .forEach((clientInfo) => {
        index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
    });
    return;
}
exports.handleRt = handleRt;
function handleAdminRt(req, action) {
    UserSchema_1.User.find({ role: 0 }, (error, docs) => {
        if (error) {
            return;
        }
        else {
            docs.forEach((user) => {
                if (!index_1.clientIdsMap[user._id]) {
                    return;
                }
                else {
                    index_1.clientIdsMap[user._id]
                        .filter((clientInfo) => {
                        return clientInfo.jwtToken !== auth_1.getToken(req);
                    })
                        .forEach((clientInfo) => {
                        index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
                    });
                }
            });
        }
    });
}
exports.handleAdminRt = handleAdminRt;
//# sourceMappingURL=realtime.js.map