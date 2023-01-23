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
exports.TaxUserJunction = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TaxTable_1 = require("./TaxTable");
const User_1 = require("./User");
let TaxUserJunction = class TaxUserJunction {
    constructor() {
        if (!this.junction_id) {
            this.junction_id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], TaxUserJunction.prototype, "junction_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "fk_user_id" }),
    (0, typeorm_1.ManyToOne)(() => User_1.User, { eager: true }),
    __metadata("design:type", User_1.User)
], TaxUserJunction.prototype, "fk_user_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "fk_table_id" }),
    (0, typeorm_1.ManyToOne)(() => TaxTable_1.TaxTable, { eager: true }),
    __metadata("design:type", TaxTable_1.TaxTable)
], TaxUserJunction.prototype, "fk_table_id", void 0);
TaxUserJunction = __decorate([
    (0, typeorm_1.Entity)("users_tax_junction"),
    __metadata("design:paramtypes", [])
], TaxUserJunction);
exports.TaxUserJunction = TaxUserJunction;
