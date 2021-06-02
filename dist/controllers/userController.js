"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.see = exports.logout = exports.login = exports.remove = exports.edit = exports.join = void 0;
const join = (req, res) => {
    return res.send("Join");
};
exports.join = join;
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
const see = (req, res) => {
    return res.send("see");
};
exports.see = see;
//# sourceMappingURL=userController.js.map