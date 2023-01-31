"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditService = void 0;
var __1 = require("../");
var CreditService = /** @class */ (function () {
    function CreditService(config) {
        __1.ServicesContainer.configure(config);
    }
    CreditService.prototype.authorize = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Auth).withAmount(amount);
    };
    CreditService.prototype.capture = function (transactionId) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Credit;
        ref.transactionId = transactionId;
        return new __1.ManagementBuilder(__1.TransactionType.Capture).withPaymentMethod(ref);
    };
    CreditService.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale).withAmount(amount);
    };
    CreditService.prototype.edit = function (transactionId) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Credit;
        if (transactionId) {
            ref.transactionId = transactionId;
        }
        return new __1.ManagementBuilder(__1.TransactionType.Edit).withPaymentMethod(ref);
    };
    CreditService.prototype.refund = function (amount) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Credit;
        return new __1.AuthorizationBuilder(__1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    CreditService.prototype.reverse = function (amount) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Credit;
        return new __1.AuthorizationBuilder(__1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    CreditService.prototype.verify = function () {
        return new __1.AuthorizationBuilder(__1.TransactionType.Verify);
    };
    CreditService.prototype.void = function (transactionId) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Credit;
        ref.transactionId = transactionId;
        return new __1.ManagementBuilder(__1.TransactionType.Void).withPaymentMethod(ref);
    };
    return CreditService;
}());
exports.CreditService = CreditService;
