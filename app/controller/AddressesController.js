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
const AddressSchema_1 = require("../schema/AddressSchema");
const UserSchema_1 = require("../schema/UserSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_ADDRESSES_ADD = "DATA_ADDRESSES_ADD";
const DATA_ADDRESSES_REMOVE = "DATA_ADDRESSES_REMOVE";
const DATA_ADDRESSES_UPDATE = "DATA_ADDRESSES_UPDATE";
const DATA_ADDRESSES_ADD_ALL = "DATA_ADDRESSES_ADD_ALL";
let AddressesController = class AddressesController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        UserSchema_1.User.find({ _id: new mongodb_1.ObjectID(userId) }, (error, docs) => {
            if (error) {
                res.send(error);
                return;
            }
            if (docs[0].role === 0) {
                AddressSchema_1.Address.find({}, (error, addresses) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(addresses);
                });
            }
            else {
                AddressSchema_1.Address.find({ userId: new mongodb_1.ObjectID(userId) }, (error, addresses) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(addresses);
                });
            }
        });
    }
    getById(req, res) {
        let userId = auth_1.handleAuth(req, res);
        AddressSchema_1.Address.find({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error, docs) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('get by id');
            res.send(docs[0]);
        });
    }
    post(req, res) {
        let userId = auth_1.handleAuth(req, res);
        req.body.userId = userId;
        new AddressSchema_1.Address(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(response.userId, req, { type: DATA_ADDRESSES_ADD, payload: { address: response } });
                this.handleAdminRt(req, { type: DATA_ADDRESSES_ADD, payload: { address: response } });
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        AddressSchema_1.Address.findOneAndUpdate({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(response.userId, req, { type: DATA_ADDRESSES_UPDATE, payload: { _id: response._id, address: req.body } });
                this.handleAdminRt(req, { type: DATA_ADDRESSES_UPDATE, payload: { _id: response._id, address: req.body } });
                res.send(response);
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        AddressSchema_1.Address.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_ADDRESSES_REMOVE, payload: { _id: req.params.id } });
                this.handleAdminRt(req, { type: DATA_ADDRESSES_REMOVE, payload: { _id: req.params.id } });
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
    handleAdminRt(req, action) {
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
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AddressesController.prototype, "get", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AddressesController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AddressesController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AddressesController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AddressesController.prototype, "delete", null);
AddressesController = __decorate([
    Controllers_1.JsonController("/api/addresses")
], AddressesController);
exports.AddressesController = AddressesController;
//# sourceMappingURL=AddressesController.js.map