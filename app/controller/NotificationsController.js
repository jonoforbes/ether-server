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
const NotificationSchema_1 = require("../schema/NotificationSchema");
const auth_1 = require("../auth");
var jwt = require("jsonwebtoken");
const DATA_NOTIFICATIONS_ADD = "DATA_NOTIFICATIONS_ADD";
const DATA_NOTIFICATIONS_REMOVE = "DATA_NOTIFICATIONS_REMOVE";
const DATA_NOTIFICATIONS_UPDATE = "DATA_NOTIFICATIONS_UPDATE";
const DATA_NOTIFICATIONS_ADD_ALL = "DATA_NOTIFICATIONS_ADD_ALL";
let NotificationsController = class NotificationsController {
    constructor() {
    }
    get(req, res) {
        let userId = auth_1.handleAuth(req, res);
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        NotificationSchema_1.Notification.find({ userId: queryUserId }, (error, notifications) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                console.log('setting notifications');
                res.send(notifications);
            }
        });
    }
    post(req, res, notificationType) {
        console.log('notification body', req.body);
        if (notificationType == 'message') {
            console.log('notification for a message');
            return;
        }
        if (notificationType == 'task') {
            console.log('notification for a task');
            return;
        }
        else {
            console.log('no notification type');
        }
    }
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], NotificationsController.prototype, "get", null);
__decorate([
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], NotificationsController.prototype, "post", null);
NotificationsController = __decorate([
    Controllers_1.JsonController("api/notifications")
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=NotificationsController.js.map