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
const TaskSchema_1 = require("../schema/TaskSchema");
const NotificationsController_1 = require("./NotificationsController");
const index_1 = require("../index");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_TASKS_ADD = "DATA_TASKS_ADD";
const DATA_TASKS_REMOVE = "DATA_TASKS_REMOVE";
const DATA_TASKS_UPDATE = "DATA_TASKS_UPDATE";
const DATA_TASKS_ADD_ALL = "DATA_TASKS_ADD_ALL";
var notificationsController = new NotificationsController_1.NotificationsController;
let TasksController = class TasksController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        TaskSchema_1.Task.find({ $or: [{ userId: queryUserId }, { recipientId: queryUserId }] }, (error, tasks) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting tasks');
            res.send(tasks);
        });
    }
    getById(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        let queryObjectId = new mongodb_1.ObjectID(req.params.id).toString();
        console.log('user', queryUserId);
        console.log('_id', queryObjectId);
        TaskSchema_1.Task.find({
            $or: [
                {
                    $and: [
                        { userId: queryUserId },
                        { _id: queryObjectId }
                    ]
                },
                {
                    $and: [
                        { recipientId: queryUserId },
                        { _id: queryObjectId }
                    ]
                }
            ]
        }, (error, tasks) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('tasks', tasks);
            res.send(tasks[0]);
        });
    }
    post(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let recipientId = req.body.recipientId;
        let ownerId = req.body.userId;
        req.body.userId = userId;
        new TaskSchema_1.Task(req.body).save((error, response) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, recipientId, req, { type: DATA_TASKS_ADD, payload: { task: response } });
                notificationsController.post(response, 'addTask');
                console.log('notification sent from task controller');
                res.send(response);
            }
        });
    }
    put(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let recipientId = req.body.recipientId;
        let ownerId = req.body.userId;
        console.log(req.body);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        let queryObjectId = new mongodb_1.ObjectID(req.params.id).toString();
        TaskSchema_1.Task.findOneAndUpdate({
            $or: [
                {
                    $and: [
                        { userId: queryUserId },
                        { _id: queryObjectId }
                    ]
                },
                {
                    $and: [
                        { recipientId: queryUserId },
                        { _id: queryObjectId }
                    ]
                }
            ]
        }, req.body, (error, response) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(ownerId, recipientId, req, { type: DATA_TASKS_UPDATE, payload: { _id: response._id, task: req.body } });
                notificationsController.post(response, 'completeTask');
                res.send(response);
            }
        });
    }
    delete(req, res) {
        let userId = auth_1.handleAuth(req, res);
        TaskSchema_1.Task.find({ _id: new mongodb_1.ObjectID(req.params.id) }, (error, docs) => {
            if (docs) {
                let recipientId = docs[0].recipientId;
                console.log('recipient', recipientId);
                TaskSchema_1.Task.remove({ _id: new mongodb_1.ObjectID(req.params.id), userId: new mongodb_1.ObjectID(userId) }, (error) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    else {
                        this.handleRt(userId, recipientId, req, { type: DATA_TASKS_REMOVE, payload: { _id: req.params.id } });
                        res.sendStatus(200);
                    }
                });
            }
        });
    }
    handleRt(userId, recipientId, req, action) {
        console.log('user', userId);
        console.log('recipient', recipientId);
        if (userId === recipientId) {
            console.log('same user as recipient');
            index_1.clientIdsMap[userId]
                .filter((clientInfo) => {
                return clientInfo.jwtToken !== auth_1.getToken(req);
            })
                .forEach((clientInfo) => {
                index_1.io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
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
], TasksController.prototype, "get", null);
__decorate([
    Methods_1.Get("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TasksController.prototype, "getById", null);
__decorate([
    Methods_1.Post("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TasksController.prototype, "post", null);
__decorate([
    Methods_1.Put("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TasksController.prototype, "put", null);
__decorate([
    Methods_1.Delete("/:id"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], TasksController.prototype, "delete", null);
TasksController = __decorate([
    Controllers_1.JsonController("/api/tasks")
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=TasksController.js.map