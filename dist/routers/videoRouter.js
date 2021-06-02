"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoRouter = express_1.default.Router();
videoRouter.get("/watch", (req, res) => {
    return res.send("Video Watch");
});
exports.default = videoRouter;
//# sourceMappingURL=videoRouter.js.map