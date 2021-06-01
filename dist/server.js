"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = 1779;
const app = express_1.default();
const logger = morgan_1.default("dev");
app.use(logger);
app.get("/", (req, res) => {
    console.log(`Please show your any ${req}`);
    res.send(`<section><h1>Done!</h1><h2>Check your console</h2></section>`);
});
app.listen(PORT, () => {
    console.log(`Hello server for http://localhost:${PORT} port🚀`);
});
//# sourceMappingURL=server.js.map