"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.get("/edit", userController_1.edit);
userRouter.get("/delete", userController_1.remove);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map