"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const videoController_1 = require("../controllers/videoController");
const middlewares_1 = require("../middlewares");
const globalRouter = express_1.default.Router();
globalRouter.get("/", videoController_1.home);
globalRouter
    .route("/join")
    .all(middlewares_1.publicOnlyMiddleware)
    .get(userController_1.getJoin)
    .post(userController_1.postJoin);
globalRouter
    .route("/login")
    .all(middlewares_1.publicOnlyMiddleware)
    .get(userController_1.getLogin)
    .post(userController_1.postLogin);
globalRouter.get("/search", videoController_1.search);
exports.default = globalRouter;
//# sourceMappingURL=globalRouter.js.map