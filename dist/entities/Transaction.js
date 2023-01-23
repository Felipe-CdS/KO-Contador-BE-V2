"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const TaxTable_1 = require("./TaxTable");
const User_1 = require("./User");
const uuid_1 = require("uuid");
let Transaction = class Transaction {
    constructor() {
        if (!this.transaction_id)
            this.transaction_id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "fk_user_id" }),
    (0, typeorm_1.ManyToOne)(() => User_1.User, { eager: true }),
    __metadata("design:type", User_1.User)
], Transaction.prototype, "fk_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "comission_total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "iss_total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "rbt_12", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "fk_tax_id" }),
    (0, typeorm_1.ManyToOne)(() => TaxTable_1.TaxTable, { eager: true }),
    __metadata("design:type", TaxTable_1.TaxTable)
], Transaction.prototype, "fk_tax_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "effective_tax_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "repartition_table_iss_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], Transaction.prototype, "comission_entries", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Transaction.prototype, "transaction_date", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)("transactions"),
    __metadata("design:paramtypes", [])
], Transaction);
exports.Transaction = Transaction;
