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
const UserDataSchema_1 = require("../schema/UserDataSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_USERS_ADD = "DATA_USERS_ADD";
const DATA_USERS_REMOVE = "DATA_USERS_REMOVE";
const DATA_USERS_UPDATE = "DATA_USERS_UPDATE";
const DATA_USERS_ADD_ALL = "DATA_USERS_ADD_ALL";
let UserDataController = class UserDataController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        UserDataSchema_1.UserData.find({ userId: { '$ne': new mongodb_1.ObjectID(userId) } }, (error, users) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting other users');
            res.send(users);
        });
    }
    getById(req, res) {
        UserDataSchema_1.UserData.find({ _id: new mongodb_1.ObjectID(req.params.id) }, (error, docs) => {
            if (error) {
                res.send(error);
                return;
            }
            res.send(docs[0]);
        });
    }
    post(req, res) {
        let userId = auth_1.handleAuth(req, res);
        req.body.userId = userId;
        new UserDataSchema_1.UserData(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_USERS_ADD, payload: { user: response } });
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        UserDataSchema_1.UserData.findOneAndUpdate({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, { type: DATA_USERS_UPDATE, payload: { _id: response._id, users: req.body } });
                res.send(response);
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        UserDataSchema_1.UserData.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_USERS_REMOVE, payload: { _id: req.params.id } });
                res.sendStatus(200);
            }
        });
    }
    handleRt(userId, req, action) {
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
    }
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], UserDataController.prototype, "get", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], UserDataController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], UserDataController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], UserDataController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], UserDataController.prototype, "delete", null);
UserDataController = __decorate([
    Controllers_1.JsonController("/api/userdata")
], UserDataController);
exports.UserDataController = UserDataController;
//# sourceMappingURL=UserDataController.js.map