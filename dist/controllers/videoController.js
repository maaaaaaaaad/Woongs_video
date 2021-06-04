"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.edit = exports.watch = exports.upload = exports.search = exports.popular = void 0;
let videos = [
    {
        id: 1,
        title: "fir Video",
        rating: 4,
        comments: 21,
        createdAt: "2 min ago",
        views: 108,
    },
    {
        id: 2,
        title: "sec Video",
        rating: 1,
        comments: 0,
        createdAt: "5 min ago",
        views: 1,
    },
    {
        id: 3,
        title: "thr Video",
        rating: 2,
        comments: 170,
        createdAt: "33 min ago",
        views: 1098,
    },
];
const popular = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos });
};
exports.popular = popular;
const search = (req, res) => {
    return res.send("login");
};
exports.search = search;
const upload = (req, res) => {
    return res.send("upload");
};
exports.upload = upload;
const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[+id - 1];
    return res.render("watch", { pageTitle: `Watch ${video.title}`, video });
};
exports.watch = watch;
const edit = (req, res) => {
    return res.send(`Edit ${req.params.id} Video`);
};
exports.edit = edit;
const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("delete video");
};
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=videoController.js.map