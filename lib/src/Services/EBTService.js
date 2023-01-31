"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBTService = void 0;
var __1 = require("../");
var EBTService = /** @class */ (function () {
    function EBTService(config) {
        __1.ServicesContainer.configure(config);
    }
    EBTService.prototype.balanceInquiry = function (type) {
        if (type === void 0) { type = __1.InquiryType.Foodstamp; }
        return new __1.AuthorizationBuilder(__1.TransactionType.Balance)
            .withBalanceInquiryType(type)
            .withAmount(0);
    };
    EBTService.prototype.benefitWithdrawal = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.BenefitWithDrawal)
            .withAmount(amount)
            .withCashBack(0);
    };
    EBTService.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale).withAmount(amount);
    };
    EBTService.prototype.refund = function (amount) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.EBT;
        return new __1.AuthorizationBuilder(__1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    return EBTService;
}());
exports.EBTService = EBTService;
