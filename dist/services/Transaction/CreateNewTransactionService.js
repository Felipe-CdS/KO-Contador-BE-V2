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
exports.CreateNewTransactionService = void 0;
const typeorm_1 = require("typeorm");
const TaxTableRepositories_1 = require("../../repositories/TaxTableRepositories");
const TransactionRepositories_1 = require("../../repositories/TransactionRepositories");
const UserRepositories_1 = require("../../repositories/UserRepositories");
class CreateNewTransactionService {
    constructor() {
        this.truncateDecimals = function (number, digits) {
            var multiplier = Math.pow(10, digits), adjustedNum = number * multiplier, truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
            return truncatedNum / multiplier;
        };
    }
    getRBT12(user_id, thisMonthTotal, transactionRepository) {
        return __awaiter(this, void 0, void 0, function* () {
            var totalLastYearIncome = 0;
            const userTransactions = yield transactionRepository.find({
                where: { fk_user_id: user_id },
                order: { transaction_date: 'DESC' },
                take: 12
            });
            if (userTransactions.length == 0)
                return (thisMonthTotal * 12);
            if (userTransactions.length < 12) {
                userTransactions.map((elem) => { totalLastYearIncome += Number(elem.comission_total); });
                totalLastYearIncome /= userTransactions.length;
                return (this.truncateDecimals((totalLastYearIncome * 12), 2));
            }
            userTransactions.map((elem) => { totalLastYearIncome += Number(elem.comission_total); });
            return (totalLastYearIncome);
        });
    }
    getThisMonthEntriesTotal(comission_entries) {
        var thisMonthTotal = 0;
        comission_entries.map((elem) => {
            thisMonthTotal += elem.comission_value;
        });
        return (thisMonthTotal);
    }
    getThisMonthISSTotal(comission_entries) {
        var thisMonthTotal = 0;
        comission_entries.map((elem) => {
            thisMonthTotal += elem.iss_value;
        });
        return (thisMonthTotal);
    }
    getEffectiveTaxPercentage(taxTable, rbt_12) {
        return __awaiter(this, void 0, void 0, function* () {
            var rangeRow = null;
            (taxTable.rows).map((elem) => {
                if (rbt_12 >= elem.min_value && rbt_12 < elem.max_value)
                    rangeRow = elem;
            });
            if (!rangeRow)
                throw new Error("Desculpe, algo deu errado... Aparentemente a sua receita bruta dos ultimos 12 meses ultrapassou o limite de faturamento anual do Simples Nacional. Consulte o seu contador para mais detalhes.");
            var effectiveRate = ((rbt_12 * rangeRow.tax_percentage) - rangeRow.discount_value) / rbt_12;
            return (this.truncateDecimals(effectiveRate, 2));
        });
    }
    execute({ comission_entries, number_identifier }, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionRepository = (0, typeorm_1.getCustomRepository)(TransactionRepositories_1.TransactionRepositories);
            const taxTableRepository = (0, typeorm_1.getCustomRepository)(TaxTableRepositories_1.TaxTableRepositories);
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepositories_1.UserRepositories);
            const user = yield userRepository.findOne({ user_id });
            const taxTable = yield taxTableRepository.findOne({ number_identifier });
            const thisMonthTotal = this.getThisMonthEntriesTotal(comission_entries);
            const rbt_12 = yield this.getRBT12(user_id, thisMonthTotal, transactionRepository);
            const effective_tax_percentage = yield this.getEffectiveTaxPercentage(taxTable, rbt_12);
            const tx = {
                fk_user_id: user,
                comission_total: thisMonthTotal,
                iss_total: this.getThisMonthISSTotal(comission_entries),
                rbt_12,
                fk_tax_id: taxTable,
                effective_tax_percentage,
                repartition_table_iss_percentage: 2123213,
                comission_entries: comission_entries
            };
            const newTx = transactionRepository.create(tx);
            yield transactionRepository.save(newTx);
            return (newTx);
        });
    }
}
exports.CreateNewTransactionService = CreateNewTransactionService;
