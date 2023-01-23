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
exports.UserTables1673414880150 = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
class UserTables1673414880150 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            dotenv_1.default.config();
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "users",
                columns: [
                    { name: "user_id", type: "uuid", isPrimary: true },
                    { name: "username", type: "varchar", isNullable: false },
                    { name: "password", type: "varchar", isNullable: false },
                    { name: "email", type: "varchar", isNullable: false },
                    { name: "updated_at", type: "timestamp", isNullable: true },
                    { name: "admin", type: "boolean", default: false }
                ]
            }));
            let hashAdminPassword = yield (0, bcryptjs_1.hash)(process.env.ADMIN_PASSWORD, 12);
            let hashUserPassword = yield (0, bcryptjs_1.hash)(process.env.USER_PASSWORD, 12);
            yield queryRunner
                .manager
                .createQueryBuilder()
                .insert()
                .into("users")
                .values({
                user_id: (0, uuid_1.v4)(),
                username: "ADMIN",
                password: hashAdminPassword,
                email: process.env.ADMIN_EMAIL,
                admin: true
            })
                .execute();
            yield queryRunner
                .manager
                .createQueryBuilder()
                .insert()
                .into("users")
                .values({
                user_id: (0, uuid_1.v4)(),
                username: "USER",
                password: hashUserPassword,
                email: process.env.USER_EMAIL
            })
                .execute();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("users");
        });
    }
}
exports.UserTables1673414880150 = UserTables1673414880150;
