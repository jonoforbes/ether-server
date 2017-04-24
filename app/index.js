"use strict";
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Factory_1 = require("controllers.ts/Factory");
const socketIo = require("socket.io");
const auth_1 = require("./auth");
exports.clientIdsMap = new Map();
const DATABASE_URI = process.env.MONGO_URL || process.env.DATABASE_URI || process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017';
let app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));
let httpInstance = require("http").Server(app);
exports.io = socketIo(httpInstance);
exports.io.on('connection', function (socket) {
    let token = socket.handshake.query["jwttoken"];
    if (auth_1.validate(token)) {
        let clientIds = exports.clientIdsMap[auth_1.getUserIdFromToken(token)];
        if (!clientIds) {
            clientIds = [];
            exports.clientIdsMap[auth_1.getUserIdFromToken(token)] = clientIds;
        }
        clientIds.push({ clientId: socket.client.id, jwtToken: token });
    }
});
exports.io.origins("*:*");
mongoose.connect(DATABASE_URI);
let port = process.env.PORT || 3000;
httpInstance.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
Factory_1.registerActionsInExpressApp(app, [__dirname + "/controller"]);
//# sourceMappingURL=index.js.map