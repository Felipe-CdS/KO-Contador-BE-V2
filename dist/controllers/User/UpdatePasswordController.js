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
exports.UpdatePasswordController = void 0;
const UpdatePasswordService_1 = require("../../services/User/UpdatePasswordService");
class UpdatePasswordController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = request.body;
            const service = new UpdatePasswordService_1.UpdatePasswordService();
            yield service.execute(request.user_id, password);
            return response.status(200).json();
        });
    }
}
exports.UpdatePasswordController = UpdatePasswordController;
