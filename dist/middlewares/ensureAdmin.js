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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const UserRepositories_1 = require("../repositories/UserRepositories");
function ensureAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = req.headers.authorization;
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepositories_1.UserRepositories);
        if (!authToken)
            return res.status(401).end();
        const [, token] = authToken.split(" ");
        try {
            const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.HASH_SECRET);
            const user = yield userRepository.findOne({ user_id: sub });
            if (!user.admin)
                return res.status(401).end();
            req.user_id = sub;
            return next();
        }
        catch (err) {
            return res.status(401).end();
        }
    });
}
exports.ensureAdmin = ensureAdmin;
