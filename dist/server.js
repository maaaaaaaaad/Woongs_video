"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const morgan_1 = __importDefault(require("morgan"));
const globalRouter_1 = __importDefault(require("./routers/globalRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const videoRouter_1 = __importDefault(require("./routers/videoRouter"));
const middlewares_1 = require("./middlewares");
const app = express_1.default();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
const logger = morgan_1.default("dev");
app.use(logger);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DB_URL }),
}));
app.use(middlewares_1.localsMiddleware);
app.use("/", globalRouter_1.default);
app.use("/user", userRouter_1.default);
app.use("/video", videoRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map