"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const middlewares_1 = require("../middlewares");
const userRouter = express_1.default.Router();
userRouter.get("/logout", middlewares_1.protectorMiddleware, userController_1.logout);
userRouter.route("/edit").all(middlewares_1.protectorMiddleware).get(userController_1.getEdit).post(userController_1.postEdit);
userRouter.get("/github/start", middlewares_1.publicOnlyMiddleware, userController_1.startGithubLogin);
userRouter.get("/github/callbackUrl", middlewares_1.publicOnlyMiddleware, userController_1.callbackGithubLogin);
userRouter.get("/:id", userController_1.watch);
userRouter.get("/delete", userController_1.remove);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map