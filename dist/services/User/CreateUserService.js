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
exports.CreateUserService = void 0;
const typeorm_1 = require("typeorm");
const generate_password_1 = require("generate-password");
const nodemailer_1 = require("nodemailer");
const UserRepositories_1 = require("../../repositories/UserRepositories");
const TaxTableRepositories_1 = require("../../repositories/TaxTableRepositories");
const TaxUserJunctionRepositories_1 = require("../../repositories/TaxUserJunctionRepositories");
class CreateUserService {
    sendSucessEmail(email, generatedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            var transporter = (0, nodemailer_1.createTransport)({
                service: 'gmail',
                auth: {
                    user: 'coutinho.felipe66@gmail.com',
                    pass: 'scumzfhcqifykqow'
                }
            });
            var mailOptions = {
                from: {
                    name: 'KO Contador Testes',
                    address: 'coutinho.felipe66@gmail.com'
                },
                to: email,
                subject: 'Conta cadastrada com sucesso no sistema de Simples Nacional!',
                text: ` Bem-vindo. Essas são suas credenciais para o primeiro login: email: ${email}, senha provisória: ${generatedPassword}`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
    execute({ username, email, admin = false, tax_types }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepositories_1.UserRepositories);
            const fullTableRepository = (0, typeorm_1.getCustomRepository)(TaxTableRepositories_1.TaxTableRepositories);
            const taxUserJunctionRepository = (0, typeorm_1.getCustomRepository)(TaxUserJunctionRepositories_1.TaxUserJunctionRepositories);
            if (!email)
                throw new Error("Email inválido.");
            const emailAlreadyExists = yield userRepository.findOne({ email });
            if (emailAlreadyExists)
                throw new Error("Esse email já existe.");
            const nameAlreadyExists = yield userRepository.findOne({ username });
            if (nameAlreadyExists)
                throw new Error("Esse nome de usuário já existe.");
            if (tax_types.length == 0)
                throw new Error("Selecione pelo menos 1 anexo.");
            for (let i = 0; i < tax_types.length; i++) {
                var checkTaxTableExists = yield fullTableRepository.findOne({ number_identifier: tax_types[i] });
                if (!checkTaxTableExists)
                    throw new Error("Um ou mais anexos não existem.");
            }
            const generatedPassword = (0, generate_password_1.generate)({ length: 8, numbers: true, excludeSimilarCharacters: true });
            const user = userRepository.create({
                username,
                email,
                password: generatedPassword,
                admin
            });
            yield userRepository.save(user);
            for (let i = 0; i < tax_types.length; i++) {
                var userId = yield userRepository.findOne({ username });
                var taxTableId = yield fullTableRepository.findOne({ number_identifier: tax_types[i] });
                var newJunction = taxUserJunctionRepository.create({
                    fk_user_id: userId,
                    fk_table_id: taxTableId
                });
                yield taxUserJunctionRepository.save(newJunction);
            }
            if (process.env.DB_SSL_ENV == "production")
                yield this.sendSucessEmail(email, generatedPassword);
            else
                console.log(">", email, generatedPassword);
            return (user);
        });
    }
}
exports.CreateUserService = CreateUserService;
