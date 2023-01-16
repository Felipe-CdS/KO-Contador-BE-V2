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
exports.TransactionTables1673511974710 = void 0;
const typeorm_1 = require("typeorm");
class TransactionTables1673511974710 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "transactions",
                columns: [
                    { name: "transaction_id", type: "uuid", isPrimary: true },
                    { name: "comission_total", type: "numeric" },
                    { name: "iss_total", type: "numeric" },
                    { name: "rbt_12", type: "numeric" },
                    { name: "effective_tax_percentage", type: "numeric" },
                    { name: "repartition_table_iss_percentage", type: "numeric" },
                    { name: "comission_entries", type: "jsonb" },
                    { name: "fk_user_id", type: "uuid" },
                    { name: "fk_tax_id", type: "uuid" },
                    { name: "transaction_date", type: "timestamp", default: "now()" },
                ],
                foreignKeys: [
                    {
                        name: "FKTaxTableConnection",
                        referencedTableName: "tax_tables",
                        referencedColumnNames: ["table_id"],
                        columnNames: ["fk_tax_id"],
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
        });
    }
}
exports.TransactionTables1673511974710 = TransactionTables1673511974710;
