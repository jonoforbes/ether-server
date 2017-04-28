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
const UserSchema_1 = require("../schema/UserSchema");
const UserDataSchema_1 = require("../schema/UserDataSchema");
const bcrypt = require("bcrypt");
const box_api_1 = require("../box-api");
var jwt = require("jsonwebtoken");
let AuthenticationController = class AuthenticationController {
    constructor() {
    }
    register(req, res) {
        var userId = '';
        var boxUserId = '';
        var userData = req.body;
        var boxRequestParams = {
            body: {
                name: req.body.login,
                is_platform_access_only: true
            }
        };
        box_api_1.boxAdminAPIClient.post('/users', boxRequestParams, box_api_1.boxAdminAPIClient.defaultResponseHandler(function (err, data) {
            if (err) {
                console.log(err);
            }
            ;
            boxUserId = data.id;
            req.body.boxUserId = boxUserId;
            new UserSchema_1.User(req.body).save((error, user) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ error: "something has gone horribly wrong" });
                    return;
                }
                let token = jwt.sign({
                    fistName: req.body.firstName,
                    lastName: req.body.lastName,
                    login: req.body.login,
                    _id: user._id
                }, "secret");
                userData["userId"] = user._id;
                res.send({ token: token, login: req.body.login, firstName: req.body.firstName, lastName: req.body.lastName });
                new UserDataSchema_1.UserData(userData).save();
            });
        }));
    }
    login(req, res) {
        UserSchema_1.User.find({ login: req.body.login }, (err, resp) => {
            if (err) {
                res.status(500).send({ error: "something has gone horribly wrong" });
                return;
            }
            if (resp.length === 0) {
                res.status(404).send({ error: "User not found" });
                return;
            }
            let user = resp[0];
            bcrypt.compare(req.body.password, user.password, (errC, isMatch) => {
                if (!isMatch) {
                    res.status(400).send({ error: "Wrong Username/password combination" });
                    return;
                }
                let token = jwt.sign({
                    fistName: user.firstName,
                    lastName: user.lastName,
                    login: user.login,
                    _id: user._id
                }, "secret");
                let boxAccessToken = "";
                box_api_1.boxAdminAPIClient._session.tokenManager.getTokensJWTGrant('user', user.boxUserId, function (err, accesstokenInfo) {
                    boxAccessToken = accesstokenInfo.accessToken;
                    res.send({
                        token: token,
                        login: user.login,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        boxUserId: user.boxUserId,
                        boxAccessToken: boxAccessToken,
                        userId: user._id,
                        role: user.role
                    });
                });
            });
        });
    }
};
__decorate([
    Methods_1.Post("/register"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AuthenticationController.prototype, "register", null);
__decorate([
    Methods_1.Post("/login"),
    __param(0, Params_1.Req()),
    __param(1, Params_1.Res())
], AuthenticationController.prototype, "login", null);
AuthenticationController = __decorate([
    Controllers_1.JsonController("/api/authentication")
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map