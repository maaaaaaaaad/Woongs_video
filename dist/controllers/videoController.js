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
exports.deleteVideo = exports.postEdit = exports.getEdit = exports.watch = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;
const HashForm_1 = require("../models/HashForm");
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
const search = (req, res) => {
    const { keyword } = req.query;
    return res.render("search", { pageTitle: `Search ${keyword}` });
};
exports.search = search;
const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Upload` });
};
exports.getUpload = getUpload;
const postUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, hashtags } = req.body;
    try {
        const videoData = new VideoForm_1.default({
            title,
            description,
            hashtags: HashForm_1.hashForm(hashtags),
        });
        yield videoData.save();
    }
    catch (error) {
        return res.render("upload", {
            pageTitle: `Upload`,
            errorMessage: `Error! ${error._message}`,
        });
    }
    return res.redirect("/");
});
exports.postUpload = postUpload;
const watch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const selectedVideo = yield VideoForm_1.default.findById(id).exec();
    if (selectedVideo === null) {
        return res.render("404", { pageTitle: "Not Found" });
    }
    else {
        return res.render("watch", {
            pageTitle: `${selectedVideo.title}`,
            selectedVideo,
        });
    }
});
exports.watch = watch;
const getEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const selectedVideo = yield VideoForm_1.default.findById(id).exec();
    if (selectedVideo === null) {
        return res.render("404", { pageTitle: "Not Found" });
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
        return res.render("404", { pageTitle: "Not Found" });
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
    yield VideoForm_1.default.findByIdAndDelete(id);
    return res.redirect("/");
});
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=videoController.js.map