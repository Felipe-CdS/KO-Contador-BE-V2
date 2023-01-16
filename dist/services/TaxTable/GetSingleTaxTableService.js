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
exports.GetSingleTaxTableService = void 0;
const typeorm_1 = require("typeorm");
const TaxTableRepositories_1 = require("../../repositories/TaxTableRepositories");
class GetSingleTaxTableService {
    execute({ number_identifier }) {
        return __awaiter(this, void 0, void 0, function* () {
            const taxTableRepository = (0, typeorm_1.getCustomRepository)(TaxTableRepositories_1.TaxTableRepositories);
            const taxTable = yield taxTableRepository.findOne({ number_identifier });
            if (!taxTable)
                throw new Error("Table doesn't exists...");
            return (taxTable);
        });
    }
}
exports.GetSingleTaxTableService = GetSingleTaxTableService;
