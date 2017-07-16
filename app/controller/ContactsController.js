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
const ContactSchema_1 = require("../schema/ContactSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
const UserSchema_1 = require("../schema/UserSchema");
var jwt = require("jsonwebtoken");
const DATA_CONTACTS_ADD = "DATA_CONTACTS_ADD";
const DATA_CONTACTS_REMOVE = "DATA_CONTACTS_REMOVE";
const DATA_CONTACTS_UPDATE = "DATA_CONTACTS_UPDATE";
const DATA_CONTACTS_ADD_ALL = "DATA_CONTACTS_ADD_ALL";
let ContactsController = class ContactsController {
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
                console.log('admin getting contacts');
                ContactSchema_1.Contact.find({}, (error, contacts) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    console.log('admin sent contacts');
                    res.send(contacts);
                });
            }
            else {
                console.log('not an admin');
                ContactSchema_1.Contact.find({ userId: new mongodb_1.ObjectID(userId) }, (error, contacts) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    console.log('setting contacts');
                    res.send(contacts);
                });
            }
        });
    }
    getById(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ContactSchema_1.Contact.find({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error, docs) => {
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
        new ContactSchema_1.Contact(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(response.userId, req, { type: DATA_CONTACTS_ADD, payload: { contact: response } });
                this.handleAdminRt(req, { type: DATA_CONTACTS_ADD, payload: { contact: response } });
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ContactSchema_1.Contact.findOneAndUpdate({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                console.log(response.userId);
                this.handleRt(response.userId, req, { type: DATA_CONTACTS_UPDATE, payload: { _id: response._id, contact: req.body } });
                this.handleAdminRt(req, { type: DATA_CONTACTS_ADD, payload: { contact: response } });
                res.send(response);
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ContactSchema_1.Contact.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, { type: DATA_CONTACTS_REMOVE, payload: { _id: req.params.id } });
                this.handleAdminRt(req, { type: DATA_CONTACTS_REMOVE, payload: { _id: req.params.id } });
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
                    this.handleRt(user._id, req, action);
                });
            }
        });
    }
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ContactsController.prototype, "get", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ContactsController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ContactsController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ContactsController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ContactsController.prototype, "delete", null);
ContactsController = __decorate([
    Controllers_1.JsonController("/api/contacts")
], ContactsController);
exports.ContactsController = ContactsController;
//# sourceMappingURL=ContactsController.js.map