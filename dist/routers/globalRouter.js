"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const videoController_1 = require("../controllers/videoController");
const globalRouter = express_1.default.Router();
globalRouter.get("/", videoController_1.popular);
globalRouter.get("/join", userController_1.join);
exports.default = globalRouter;
//# sourceMappingURL=globalRouter.js.map