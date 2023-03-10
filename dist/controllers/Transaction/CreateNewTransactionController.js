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
exports.CreateNewTransactionController = void 0;
const CreateNewTransactionService_1 = require("../../services/Transaction/CreateNewTransactionService");
class CreateNewTransactionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { comission_entries, number_identifier, transaction_date } = request.body;
            const service = new CreateNewTransactionService_1.CreateNewTransactionService();
            const newTx = yield service.execute({ comission_entries, number_identifier, transaction_date }, request.user_id);
            var returnJSON = Object.assign(Object.assign({}, newTx), { username: newTx.fk_user_id.username, tax_name: newTx.fk_tax_id.tax_name });
            delete returnJSON.transaction_id;
            delete returnJSON.fk_user_id;
            delete returnJSON.fk_tax_id;
            return response.json(returnJSON);
        });
    }
}
exports.CreateNewTransactionController = CreateNewTransactionController;
