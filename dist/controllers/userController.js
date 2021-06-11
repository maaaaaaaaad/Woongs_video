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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = exports.logout = exports.login = exports.remove = exports.edit = exports.postJoin = exports.getJoin = void 0;
const UserForm_1 = __importDefault(require("../models/UserForm"));
const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
exports.getJoin = getJoin;
const postJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName, nickName, location } = req.body;
    const createUserData = new UserForm_1.default({
        email,
        password,
        userName,
        nickName,
        location,
    });
    yield createUserData.save();
    return res.redirect("/login");
});
exports.postJoin = postJoin;
const edit = (req, res) => {
    return res.send("Edit Profile");
};
exports.edit = edit;
const remove = (req, res) => {
    return res.send("delete");
};
exports.remove = remove;
const login = (req, res) => {
    return res.send("login");
};
exports.login = login;
const logout = (req, res) => {
    return res.send("logout");
};
exports.logout = logout;
const watch = (req, res) => {
    return res.send("wat");
};
exports.watch = watch;
//# sourceMappingURL=userController.js.map