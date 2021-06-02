"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("../controllers/videoController");
const videoRouter = express_1.default.Router();
videoRouter.get("/watch", videoController_1.watch);
videoRouter.get("/edit", videoController_1.edit);
exports.default = videoRouter;
//# sourceMappingURL=videoRouter.js.map