"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.upload = exports.search = exports.edit = exports.see = exports.popular = void 0;
const popular = (req, res) => {
    return res.send("Popular");
};
exports.popular = popular;
const see = (req, res) => {
    return res.send("Video see");
};
exports.see = see;
const edit = (req, res) => {
    return res.send("Video Edit");
};
exports.edit = edit;
const search = (req, res) => {
    return res.send("login");
};
exports.search = search;
const upload = (req, res) => {
    return res.send("upload");
};
exports.upload = upload;
const deleteVideo = (req, res) => {
    return res.send("delete video");
};
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=videoController.js.map