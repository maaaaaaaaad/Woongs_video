"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.edit = exports.join = void 0;
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
//# sourceMappingURL=userController.js.map