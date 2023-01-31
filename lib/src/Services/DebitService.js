"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebitService = void 0;
var __1 = require("../");
var DebitService = /** @class */ (function () {
    function DebitService(config) {
        __1.ServicesContainer.configure(config);
    }
    DebitService.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale).withAmount(amount);
    };
    DebitService.prototype.refund = function (amount) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Debit;
        return new __1.AuthorizationBuilder(__1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    DebitService.prototype.reverse = function (amount) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Debit;
        return new __1.AuthorizationBuilder(__1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    return DebitService;
}());
exports.DebitService = DebitService;
