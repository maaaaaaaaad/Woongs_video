"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = exports.logout = exports.remove = exports.edit = exports.callbackGithubLogin = exports.startGithubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const UserForm_1 = __importDefault(require("../models/UserForm"));
const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
exports.getJoin = getJoin;
const postJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, password2, userName, nickName, location } = req.body;
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "Password does not match",
        });
    }
    const userNameExists = yield UserForm_1.default.exists({
        $or: [{ email }, { userName }],
    });
    if (userNameExists) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "This user name or email address is already taken.",
        });
    }
    try {
        const createUserData = new UserForm_1.default({
            email,
            password,
            userName,
            nickName,
            location,
        });
        yield createUserData.save();
        return res.redirect("/login");
    }
    catch (error) {
        return res.status(400).render("join", {
            pageTitle: `Join`,
            errorMessage: `Error! ${error._message}`,
        });
    }
});
exports.postJoin = postJoin;
const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "SIGN IN" });
};
exports.getLogin = getLogin;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const userExists = yield UserForm_1.default.findOne({ userName });
    if (!userExists) {
        return res.status(400).render("login", {
            pageTitle: "SIGN IN",
            errorMessage: "Not found an Account",
        });
    }
    const checkingPassword = yield bcrypt_1.default.compare(password, userExists.password);
    if (!checkingPassword) {
        return res.status(400).render("login", {
            pageTitle: "SIGN IN",
            errorMessage: "No password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = userExists;
    return res.redirect("/");
});
exports.postLogin = postLogin;
const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const loginUrl = `${baseUrl}?${params}`;
    return res.redirect(loginUrl);
};
exports.startGithubLogin = startGithubLogin;
const callbackGithubLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const loginUrl = `${baseUrl}?${params}`;
    try {
        const tokenReq = yield (yield node_fetch_1.default(loginUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })).json();
        if ("access_token" in tokenReq) {
            const { access_token } = tokenReq;
            const userReq = yield (yield node_fetch_1.default("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })).json();
            const emailReq = yield (yield node_fetch_1.default("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })).json();
            const email = emailReq.find((emailItems) => emailItems.primary === true && emailItems.verified === true);
            if (!email) {
                return res.redirect("/login");
            }
            console.log(email);
        }
        else {
            return res.redirect("/login");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.callbackGithubLogin = callbackGithubLogin;
const edit = (req, res) => {
    return res.send("Edit Profile");
};
exports.edit = edit;
const remove = (req, res) => {
    return res.send("delete");
};
exports.remove = remove;
const logout = (req, res) => {
    return res.send("logout");
};
exports.logout = logout;
const watch = (req, res) => {
    return res.send("wat");
};
exports.watch = watch;
//# sourceMappingURL=userController.js.map