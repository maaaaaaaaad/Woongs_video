"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.edit = exports.see = exports.upload = exports.search = exports.popular = void 0;
const popular = (req, res) => res.render("home", { pageTitle: "Home" });
exports.popular = popular;
const search = (req, res) => {
    return res.send("login");
};
exports.search = search;
const upload = (req, res) => {
    return res.send("upload");
};
exports.upload = upload;
const see = (req, res) => {
    console.log(req.params);
    return res.send(`Video watch ${req.params.id}`);
};
exports.see = see;
const edit = (req, res) => {
    console.log(req.params);
    return res.send("Video Edit");
};
exports.edit = edit;
const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("delete video");
};
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=videoController.js.map