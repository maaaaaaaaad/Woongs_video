"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("../controllers/videoController");
const videoRouter = express_1.default.Router();
videoRouter.get("/:id([0-9a-f]{24})", videoController_1.watch);
videoRouter.route("/upload").get(videoController_1.getUpload).post(videoController_1.postUpload);
videoRouter
    .route("/:id([0-9a-f]{24})/edit")
    .get(videoController_1.getEdit)
    .post(videoController_1.postEdit);
exports.default = videoRouter;
//# sourceMappingURL=videoRouter.js.map