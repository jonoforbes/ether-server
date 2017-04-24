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
const ClientAccountSchema_1 = require("../schema/ClientAccountSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_CLIENT_ACCOUNTS_ADD = "DATA_CLIENT_ACCOUNTS_ADD";
const DATA_CLIENT_ACCOUNTS_REMOVE = "DATA_CLIENT_ACCOUNTS_REMOVE";
;
const DATA_CLIENT_ACCOUNTS_UPDATE = "DATA_CLIENT_ACCOUNTS_UPDATE";
const DATA_CLIENT_ACCOUNTS_ADD_ALL = "DATA_CLIENT_ACCOUNTS_ADD_ALL";
let ClientAccountsController = class ClientAccountsController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ClientAccountSchema_1.ClientAccount.find({ userId: new mongodb_1.ObjectID(userId) }, (error, clientAccounts) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                console.log('setting accounts');
                res.send(clientAccounts);
                return;
            }
        });
    }
    getById(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ClientAccountSchema_1.ClientAccount.find({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error, docs) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                res.send(docs[0]);
                return;
            }
        });
    }
    post(req, res) {
        let userId = auth_1.handleAuth(req, res);
        req.body.userId = userId;
        new ClientAccountSchema_1.ClientAccount(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_CLIENT_ACCOUNTS_ADD, payload: { clientAccount: response } });
                res.send(response);
                return;
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ClientAccountSchema_1.ClientAccount.findOneAndUpdate({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_CLIENT_ACCOUNTS_UPDATE, payload: { _id: response._id, clientAccount: req.body } });
                res.send(response);
                return;
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ClientAccountSchema_1.ClientAccount.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_CLIENT_ACCOUNTS_REMOVE, payload: { _id: req.params.id } });
                res.sendStatus(200);
                return;
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
], ClientAccountsController.prototype, "get", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ClientAccountsController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ClientAccountsController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ClientAccountsController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ClientAccountsController.prototype, "delete", null);
ClientAccountsController = __decorate([
    Controllers_1.JsonController("/api/clientaccounts")
], ClientAccountsController);
exports.ClientAccountsController = ClientAccountsController;
//# sourceMappingURL=ClientAccountsController.js.map