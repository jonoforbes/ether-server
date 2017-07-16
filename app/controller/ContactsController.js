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
const auth_1 = require("../auth");
const UserSchema_1 = require("../schema/UserSchema");
const realtime_1 = require("../realtime");
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
                realtime_1.handleRt(response.userId, req, { type: DATA_CONTACTS_ADD, payload: { contact: response } });
                realtime_1.handleAdminRt(req, { type: DATA_CONTACTS_ADD, payload: { contact: response } });
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ContactSchema_1.Contact.findOneAndUpdate({ _id: new mongodb_1.ObjectID(req.params.id) }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
                return;
            }
            else {
                realtime_1.handleRt(response.userId, req, { type: DATA_CONTACTS_UPDATE, payload: { _id: response._id, contact: req.body } });
                realtime_1.handleAdminRt(req, { type: DATA_CONTACTS_UPDATE, payload: { _id: response._id, contact: req.body } });
                res.send(response);
                return;
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
                realtime_1.handleRt(userId, req, { type: DATA_CONTACTS_REMOVE, payload: { _id: req.params.id } });
                realtime_1.handleAdminRt(req, { type: DATA_CONTACTS_REMOVE, payload: { _id: req.params.id } });
                res.sendStatus(200);
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