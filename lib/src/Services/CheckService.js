"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
var __1 = require("../");
var CheckService = /** @class */ (function () {
    function CheckService(config) {
        __1.ServicesContainer.configure(config);
    }
    CheckService.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale).withAmount(amount);
    };
    CheckService.prototype.void = function (transactionId) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.ACH;
        ref.transactionId = transactionId;
        return new __1.ManagementBuilder(__1.TransactionType.Void).withPaymentMethod(ref);
    };
    return CheckService;
}());
exports.CheckService = CheckService;
