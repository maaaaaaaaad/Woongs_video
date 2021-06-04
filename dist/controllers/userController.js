"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = exports.logout = exports.login = exports.remove = exports.edit = exports.join = void 0;
const join = (req, res) => res.render("join", { pageTitle: "Join" });
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
const watch = (req, res) => {
    return res.send("wat");
};
exports.watch = watch;
//# sourceMappingURL=userController.js.map