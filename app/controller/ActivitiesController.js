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
        let queryUserId = new mongodb_1.ObjectID(userId).toString();
        ActivitySchema_1.Activity.find({ recipientId: queryUserId }, (error, activities) => {
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
};
__decorate([
    Methods_1.Get("/"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], ActivitiesController.prototype, "get", null);
ActivitiesController = __decorate([
    Controllers_1.JsonController("api/activities")
], ActivitiesController);
exports.ActivitiesController = ActivitiesController;
//# sourceMappingURL=ActivitiesController.js.map