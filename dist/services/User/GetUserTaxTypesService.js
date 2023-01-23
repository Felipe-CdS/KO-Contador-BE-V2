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
exports.GetUserTaxTypesService = void 0;
const typeorm_1 = require("typeorm");
const TaxUserJunctionRepositories_1 = require("../../repositories/TaxUserJunctionRepositories");
const UserRepositories_1 = require("../../repositories/UserRepositories");
class GetUserTaxTypesService {
    execute(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var taxTypes = [];
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepositories_1.UserRepositories);
            const junctionRepository = (0, typeorm_1.getCustomRepository)(TaxUserJunctionRepositories_1.TaxUserJunctionRepositories);
            const user = yield userRepository.findOne({ user_id });
            if (!user)
                throw new Error("Usuário não encontrado.");
            const userTaxJunctions = yield junctionRepository.find({ fk_user_id: user });
            for (let i = 0; i < userTaxJunctions.length; i++)
                taxTypes.push(userTaxJunctions[i].fk_table_id.number_identifier);
            return (taxTypes);
        });
    }
}
exports.GetUserTaxTypesService = GetUserTaxTypesService;
