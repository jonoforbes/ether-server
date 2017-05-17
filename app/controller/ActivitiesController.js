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
const ActivitySchema_1 = require("../schema/ActivitySchema");
const UserDataSchema_1 = require("../schema/UserDataSchema");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_ACTIVITIES_ADD = "DATA_ACTIVITIES_ADD";
const DATA_ACTIVITIES_REMOVE = "DATA_ACTIVITIES_REMOVE";
const DATA_ACTIVITIES_UPDATE = "DATA_ACTIVITIES_UPDATE";
const DATA_ACTIVITIES_ADD_ALL = "DATA_ACTIVITIES_ADD_ALL";
let ActivitiesController = class ActivitiesController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ActivitySchema_1.Activity.find({ recipientId: new mongodb_1.ObjectID(userId) }, (error, activities) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                console.log('activities');
                res.send(activities);
            }
        });
    }
    post(req, activityType) {
        if (activityType == 'message') {
            console.log('notification for a message');
            UserDataSchema_1.UserData.find({ userId: req.userId }, (error, docs) => {
                if (error) {
                    console.log(error);
                    return;
                }
                else {
                    var activityHeader = `${docs[0].firstName} sent you a message`;
                    var activityBody = {
                        header: activityHeader,
                        content: req.content,
                        type: activityType,
                        recipientId: req.recipientId,
                        messageId: req._id,
                        seen: false
                    };
                    console.log('pres save', activityBody);
                    new ActivitySchema_1.Activity(activityBody).save((error, response) => {
                        if (error) {
                            console.log('error', error);
                        }
                        else {
                            this.handleRt(req.recipientId, { type: DATA_ACTIVITIES_ADD, payload: { activity: response } });
                            console.log('notification added', response);
                        }
                    });
                    return;
                }
            });
        }
        if (activityType == 'addTask') {
            console.log('notification for add task');
            UserDataSchema_1.UserData.find({ userId: req.userId }, (error, docs) => {
                if (error) {
                    console.log(error);
                    return;
                }
                else {
                    var activityHeader = `${docs[0].firstName} sent you a task`;
                    var activityBody = {
                        header: activityHeader,
                        content: req.content,
                        type: activityType,
                        recipientId: req.recipientId,
                        taskId: req._id,
                        seen: false
                    };
                    console.log('pre save', activityBody);
                    new ActivitySchema_1.Activity(activityBody).save((error, response) => {
                        if (error) {
                            console.log('error', error);
                            return;
                        }
                        else {
                            this.handleRt(req.recipientId, { type: DATA_ACTIVITIES_ADD, payload: { activity: response } });
                            console.log('notification added', response);
                            return;
                        }
                    });
                }
            });
        }
        if (activityType == 'completeTask') {
            console.log('notification for complete task');
            UserDataSchema_1.UserData.find({ userId: req.userId }, (error, docs) => {
                if (error) {
                    console.log(error);
                    return;
                }
                else {
                    var activityHeader = `${docs[0].firstName} completed a task`;
                    var activityBody = {
                        header: activityHeader,
                        content: req.content,
                        type: activityType,
                        recipientId: req.userId,
                        taskId: req._id,
                        seen: false
                    };
                    console.log('pre save', activityBody);
                    new ActivitySchema_1.Activity(activityBody).save((errr, response) => {
                        if (error) {
                            console.log('error', error);
                            return;
                        }
                        else {
                            this.handleRt(req.userId, { type: DATA_ACTIVITIES_UPDATE, payload: { _id: response._id, activity: activityBody } });
                            console.log('notification added', response);
                            return;
                        }
                    });
                }
            });
        }
        else {
            return;
        }
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        ActivitySchema_1.Activity.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, { type: DATA_ACTIVITIES_REMOVE, payload: { _id: req.params.id } });
                res.sendStatus(200);
            }
        });
    }
    handleRt(userId, action) {
        if (!index_1.clientIdsMap[userId]) {
            return;
        }
        index_1.clientIdsMap[userId]
            .forEach((clientInfo) => {
            index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
        });
    }
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ActivitiesController.prototype, "get", null);
__decorate([
    __param(0, Params_1.Req())
], ActivitiesController.prototype, "post", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ActivitiesController.prototype, "delete", null);
ActivitiesController = __decorate([
    Controllers_1.JsonController("/api/activities")
], ActivitiesController);
exports.ActivitiesController = ActivitiesController;
//# sourceMappingURL=ActivitiesController.js.map