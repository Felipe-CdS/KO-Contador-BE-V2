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
exports.CreateNewTaxTableService = void 0;
const typeorm_1 = require("typeorm");
const TaxTableRepositories_1 = require("../../repositories/TaxTableRepositories");
class CreateNewTaxTableService {
    execute({ tax_name, number_identifier, rows }) {
        return __awaiter(this, void 0, void 0, function* () {
            const taxTableRepository = (0, typeorm_1.getCustomRepository)(TaxTableRepositories_1.TaxTableRepositories);
            const identifierAlreadyExists = yield taxTableRepository.findOne({ number_identifier });
            if (identifierAlreadyExists)
                throw new Error("Identifier already exists...");
            if (!tax_name)
                tax_name = "Tabela sem nome";
            const newTable = taxTableRepository.create({ tax_name, number_identifier, rows });
            yield taxTableRepository.save(newTable);
            return (newTable);
        });
    }
}
exports.CreateNewTaxTableService = CreateNewTaxTableService;
