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
exports.LoginUserService = void 0;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const UserRepositories_1 = require("../../repositories/UserRepositories");
const User_1 = require("../../entities/User");
class LoginUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepositories_1.UserRepositories);
            const user = yield userRepository.findOne({ email });
            console.log(user);
            if (!user)
                throw new Error("Invalid Email/Password!");
            const passwordMatch = yield User_1.User.comparePassword(password, user.password);
            if (!passwordMatch)
                throw new Error("Invalid Email/Password!");
            var firstLogin = false;
            if (!user.updated_at)
                firstLogin = true;
            const token = (0, jsonwebtoken_1.sign)({ email: user.email }, process.env.HASH_SECRET, { subject: user.user_id, expiresIn: "1d" });
            if (user.admin)
                return ({ token, role: true, firstLogin });
            return ({ token, firstLogin });
        });
    }
}
exports.LoginUserService = LoginUserService;
