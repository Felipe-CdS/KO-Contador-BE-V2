"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuth(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken)
        return res.status(401).end();
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.HASH_SECRET);
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
exports.ensureAuth = ensureAuth;
