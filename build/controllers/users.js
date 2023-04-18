"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const users_1 = require("../DB/users");
const lodash_1 = require("lodash");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.getUsers)();
        return res.status(http_status_codes_1.StatusCodes.OK).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield (0, users_1.deleteUserById)(id);
        return res.json(deleteUser);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = (0, lodash_1.get)(req, 'params');
        console.log('PARAMS', req);
        // console.log('PARAMS', req);
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400);
        }
        const user = yield (0, users_1.getUserById)(id);
        if (user) {
            user.username = username;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.updateUser = updateUser;
