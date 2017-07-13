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
const TaxSchema_1 = require("../schema/TaxSchema");
const UserSchema_1 = require("../schema/UserSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_TAXES_ADD = "DATA_TAXES_ADD";
const DATA_TAXES_REMOVE = "DATA_TAXES_REMOVE";
const DATA_TAXES_UPDATE = "DATA_TAXES_UPDATE";
const DATA_TAXES_ADD_ALL = "DATA_TAXES_ADD_ALL";
let TaxesController = class TaxesController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        TaxSchema_1.Tax.find({ userId: new mongodb_1.ObjectID(userId) }, (error, taxes) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting taxes');
            res.send(taxes);
        });
    }
    getAdmin(req, res) {
        let userId = auth_1.handleAuth(req, res);
        UserSchema_1.User.find({ _id: new mongodb_1.ObjectID(userId) }, (error, docs) => {
            if (error) {
                res.send(error);
                return;
            }
            if (docs[0].role !== "admin") {
                res.send(error);
                return;
            }
            else {
                TaxSchema_1.Tax.find({ _id: { '$ne': null } }, (error, taxes) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(taxes);
                });
            }
        });
    }
    getById(req, res) {
        let userId = auth_1.handleAuth(req, res);
        TaxSchema_1.Tax.find({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error, docs) => {
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
        new TaxSchema_1.Tax(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_TAXES_ADD, payload: { tax: response } });
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        TaxSchema_1.Tax.findOneAndUpdate({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, { type: DATA_TAXES_UPDATE, payload: { _id: response._id, tax: req.body } });
                res.send(response);
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        TaxSchema_1.Tax.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_TAXES_REMOVE, payload: { _id: req.params.id } });
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
], TaxesController.prototype, "get", null);
__decorate([
    Methods_1.Get("/admin"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TaxesController.prototype, "getAdmin", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TaxesController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TaxesController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TaxesController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TaxesController.prototype, "delete", null);
TaxesController = __decorate([
    Controllers_1.JsonController("/api/taxes")
], TaxesController);
exports.TaxesController = TaxesController;
//# sourceMappingURL=TaxesController.js.map