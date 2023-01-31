"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debit = void 0;
var __1 = require("../");
var PaymentMethod_1 = require("./PaymentMethod");
var Debit = /** @class */ (function (_super) {
    __extends(Debit, _super);
    function Debit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = __1.PaymentMethodType.Debit;
        return _this;
    }
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.addValue = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.refund = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Refund, this).withAmount(amount);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.reverse = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Reversal, this).withAmount(amount);
    };
    return Debit;
}(PaymentMethod_1.PaymentMethod));
exports.Debit = Debit;
