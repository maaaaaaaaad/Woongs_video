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
exports.postEdit = exports.getEdit = exports.watch = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find({});
        return res.render("home", { pageTitle: "Home", videos });
    }
    catch (error) {
        console.log("Error", error);
        return res.send("Error! not found data");
    }
});
exports.home = home;
const search = (req, res) => {
    return res.send("login");
};
exports.search = search;
const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Upload` });
};
exports.getUpload = getUpload;
const postUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, discription, hashtags } = req.body;
    try {
        const videoData = new Video_1.default({
            title,
            discription,
            hashtags: hashtags.split(",").map((tag) => `#${tag}`),
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
const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watch` });
};
exports.watch = watch;
const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Edit` });
};
exports.getEdit = getEdit;
const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    return res.redirect(`/video/${id}`);
};
exports.postEdit = postEdit;
//# sourceMappingURL=videoController.js.map