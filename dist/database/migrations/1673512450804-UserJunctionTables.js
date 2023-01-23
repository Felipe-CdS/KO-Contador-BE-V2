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
exports.UserJunctionTables1673512450804 = void 0;
const typeorm_1 = require("typeorm");
class UserJunctionTables1673512450804 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "users_tax_junction",
                columns: [
                    { name: "junction_id", type: "uuid", isPrimary: true },
                    { name: "fk_table_id", type: "uuid" },
                    { name: "fk_user_id", type: "uuid" }
                ],
                foreignKeys: [
                    {
                        name: "FKFullTableConnection",
                        referencedTableName: "tax_tables",
                        referencedColumnNames: ["table_id"],
                        columnNames: ["fk_table_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKUserConnection",
                        referencedTableName: "users",
                        referencedColumnNames: ["user_id"],
                        columnNames: ["fk_user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("users_tax_junction");
        });
    }
}
exports.UserJunctionTables1673512450804 = UserJunctionTables1673512450804;
