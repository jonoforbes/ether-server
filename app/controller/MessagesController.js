"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const Controllers_1 = require("controllers.ts/decorator/Controllers");
const Methods_1 = require("controllers.ts/decorator/Methods");
const Params_1 = require("controllers.ts/decorator/Params");
const mongodb_1 = require("mongodb");
const MessagesSchema_1 = require("../schema/MessagesSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_MESSAGES_ADD = "DATA_MESSAGES_ADD";
const DATA_MESSAGES_REMOVE = "DATA_MESSAGE_REMOVE";
const DATA_MESSAGES_UPDATE = "DATA_MESSAGES_UPDATE";
const DATA_MESSAGES_ADD_ALL = "DATA_MESSAGES_ADD_ALL";
let MessagesController = class MessagesController {
    constructor(notificationsController) {
        this.notificationsController = notificationsController;
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        MessagesSchema_1.Message.find({ $or: [{ userId: queryUserId }, { recipientId: queryUserId }] }, (error, messages) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting messages');
            res.send(messages);
        });
    }
    getById(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        let queryObjectId = new mongodb_1.ObjectID(req.params.id).toString();
        console.log('user', queryUserId);
        console.log('recipient', queryObjectId);
        MessagesSchema_1.Message.find({
            $or: [
                {
                    $and: [
                        { userId: queryUserId },
                        { recipientId: queryObjectId }
                    ]
                },
                {
                    $and: [
                        { userId: queryObjectId },
                        { recipientId: queryUserId }
                    ]
                }
            ]
        }, (error, messages) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('messages', messages);
            res.send(messages);
        });
    }
    post(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let recipientId = req.body.recipientId;
        console.log(req.body);
        req.body.userId = userId;
        new MessagesSchema_1.Message(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, recipientId, req, { type: DATA_MESSAGES_ADD, payload: { message: response } });
                this.notificationsController.post(req, res, 'message');
                console.log('notification sent from message controller');
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        let recipientId = req.body.recipientId;
        let queryObjectId = new mongodb_1.ObjectID(req.params.id).toString();
        MessagesSchema_1.Message.findOneAndUpdate({
            $and: [
                { _id: queryObjectId },
                {
                    $or: [
                        { userId: queryUserId },
                        { recipientId: queryUserId }
                    ]
                }
            ]
        }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, recipientId, req, { type: DATA_MESSAGES_UPDATE, payload: { _id: response._id, contact: req.body } });
                res.send(response);
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        let recipientId = req.body.recipientId;
        let queryObjectId = new mongodb_1.ObjectID(req.params.id).toString();
        MessagesSchema_1.Message.remove({
            $and: [
                { _id: queryObjectId },
                {
                    $or: [
                        { userId: queryUserId },
                        { recipientId: queryUserId }
                    ]
                }
            ]
        }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, recipientId, req, { type: DATA_MESSAGES_REMOVE, payload: { _id: req.params.id } });
                res.sendStatus(200);
            }
        });
    }
    handleRt(userId, recipientId, req, action) {
        console.log(userId);
        console.log(recipientId);
        if (!index_1.clientIdsMap[userId] && !index_1.clientIdsMap[recipientId]) {
            console.log("Case 1");
            return;
        }
        else if (index_1.clientIdsMap[userId] && !index_1.clientIdsMap[recipientId]) {
            index_1.clientIdsMap[userId]
                .filter((clientInfo) => {
                return clientInfo.jwtToken !== auth_1.getToken(req);
            })
                .forEach((clientInfo) => {
                index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
        }
        else if (!index_1.clientIdsMap[userId] && index_1.clientIdsMap[recipientId]) {
            index_1.clientIdsMap[recipientId]
                .filter((clientInfo) => {
                return clientInfo.jwtToken !== auth_1.getToken(req);
            })
                .forEach((clientInfo) => {
                index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
        }
        else {
            index_1.clientIdsMap[userId]
                .filter((clientInfo) => {
                return clientInfo.jwtToken !== auth_1.getToken(req);
            })
                .forEach((clientInfo) => {
                index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
            index_1.clientIdsMap[recipientId]
                .filter((clientInfo) => {
                return clientInfo.jwtToken !== auth_1.getToken(req);
            })
                .forEach((clientInfo) => {
                index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
        }
    }
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], MessagesController.prototype, "get", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], MessagesController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], MessagesController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], MessagesController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], MessagesController.prototype, "delete", null);
MessagesController = __decorate([
    Controllers_1.JsonController("/api/messages")
], MessagesController);
exports.MessagesController = MessagesController;
//# sourceMappingURL=MessagesController.js.map