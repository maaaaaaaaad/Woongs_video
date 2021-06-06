"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const videoController_1 = require("../controllers/videoController");
const globalRouter = express_1.default.Router();
globalRouter.get("/", videoController_1.home);
globalRouter.get("/join", userController_1.join);
globalRouter.get("/login", userController_1.login);
globalRouter.get("/search", videoController_1.search);
exports.default = globalRouter;
//# sourceMappingURL=globalRouter.js.map