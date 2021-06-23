"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controllers/userController");
const express_1 = __importDefault(require("express"));
const userController_2 = require("../controllers/userController");
const middlewares_1 = require("../middlewares");
const userRouter = express_1.default.Router();
userRouter.get("/logout", middlewares_1.protectorMiddleware, userController_2.logout);
userRouter
    .route("/edit")
    .all(middlewares_1.protectorMiddleware)
    .get(userController_2.getEdit)
    .post(middlewares_1.uploadFiles.single("avatar"), userController_2.postEdit);
userRouter
    .route("/change-password")
    .all(middlewares_1.protectorMiddleware)
    .get(userController_1.getChangePassword)
    .post(userController_1.postChangePassword);
userRouter.get("/github/start", middlewares_1.publicOnlyMiddleware, userController_2.startGithubLogin);
userRouter.get("/github/callbackUrl", middlewares_1.publicOnlyMiddleware, userController_2.callbackGithubLogin);
userRouter.get("/:id", userController_2.watch);
userRouter.get("/delete", userController_2.remove);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map