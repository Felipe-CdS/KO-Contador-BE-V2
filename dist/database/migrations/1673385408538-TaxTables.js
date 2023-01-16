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
exports.TaxTables1673385408538 = void 0;
const typeorm_1 = require("typeorm");
class TaxTables1673385408538 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "tax_tables",
                columns: [
                    { name: "table_id", type: "uuid", isPrimary: true },
                    { name: "number_identifier", type: "int" },
                    { name: "tax_name", type: "varchar", isNullable: true },
                    { name: "rows", type: "jsonb" },
                    { name: "repartition_table", type: "jsonb" }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("tax_tables");
        });
    }
}
exports.TaxTables1673385408538 = TaxTables1673385408538;
