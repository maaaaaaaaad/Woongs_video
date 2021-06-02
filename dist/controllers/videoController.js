"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.watch = exports.popular = void 0;
const popular = (req, res) => {
    return res.send("Popular");
};
exports.popular = popular;
const watch = (req, res) => {
    return res.send("Video Watch");
};
exports.watch = watch;
const edit = (req, res) => {
    return res.send("Video Edit");
};
exports.edit = edit;
//# sourceMappingURL=videoController.js.map