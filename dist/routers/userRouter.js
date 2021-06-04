"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.get("/logout", userController_1.logout);
userRouter.get("/edit", userController_1.edit);
userRouter.get("/delete", userController_1.remove);
userRouter.get("/:id", userController_1.watch);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map