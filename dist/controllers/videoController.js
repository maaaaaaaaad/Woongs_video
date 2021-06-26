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
exports.deleteVideo = exports.postEdit = exports.getEdit = exports.postUpload = exports.getUpload = exports.search = exports.watch = exports.home = void 0;
const alert_1 = __importDefault(require("alert"));
const HashForm_1 = require("../models/HashForm");
const UserForm_1 = __importDefault(require("../models/UserForm"));
const VideoForm_1 = __importDefault(require("../models/VideoForm"));
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield VideoForm_1.default.find({}).sort({ createdAt: "desc" });
        return res.render("home", { pageTitle: "Home", videos });
    }
    catch (error) {
        console.log("Error", error);
        return res.send("Error! not found data");
    }
});
exports.home = home;
const watch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const selectedVideo = yield VideoForm_1.default.findById(id).populate("owner");
    console.log(selectedVideo);
    if (selectedVideo === null) {
        return res.status(404).render("404", { pageTitle: "Not Found" });
    }
    else {
        return res.render("watch", {
            pageTitle: `${selectedVideo.title}`,
            selectedVideo,
        });
    }
});
exports.watch = watch;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    let videoFind = [];
    videoFind = yield VideoForm_1.default.find({
        title: {
            $regex: new RegExp(`${keyword}`, "i"),
        },
    });
    return res.render("search", { pageTitle: `Search ${keyword}`, videoFind });
});
exports.search = search;
const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Upload` });
};
exports.getUpload = getUpload;
const postUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { session: { user: _id }, } = req;
    const fileUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const { title, description, hashtags } = req.body;
    try {
        const videoData = yield VideoForm_1.default.create({
            title,
            fileUrl,
            owner: _id,
            description,
            hashtags: HashForm_1.hashForm(hashtags),
        });
        const user = yield UserForm_1.default.findById(_id);
        user === null || user === void 0 ? void 0 : user.videos.push(videoData._id);
        user === null || user === void 0 ? void 0 : user.save();
        return res.redirect("/");
    }
    catch (error) {
        return res.status(400).render("upload", {
            pageTitle: `Upload`,
            errorMessage: `Error! ${error._message}`,
        });
    }
});
exports.postUpload = postUpload;
const getEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const selectedVideo = yield VideoForm_1.default.findById(id).exec();
    if (selectedVideo === null) {
        return res.status(404).render("404", { pageTitle: "Not Found" });
    }
    if (String(selectedVideo.owner) !== req.session.user._id) {
        alert_1.default("Not acess");
        return res.redirect("/");
    }
    return res.render("edit", {
        pageTitle: `Edit ${selectedVideo.title}`,
        selectedVideo,
    });
});
exports.getEdit = getEdit;
const postEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const selectedVideo = yield VideoForm_1.default.exists({ _id: id });
    if (selectedVideo === false) {
        return res.status(400).render("404", { pageTitle: "Not Found" });
    }
    yield VideoForm_1.default.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: HashForm_1.hashForm(hashtags),
    });
    return res.redirect(`/video/${id}`);
});
exports.postEdit = postEdit;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const video = yield VideoForm_1.default.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== req.session.user._id) {
        return res.status(403).redirect("/");
    }
    yield VideoForm_1.default.findByIdAndDelete(id);
    return res.redirect("/");
});
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=videoController.js.map