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
exports.Customer = void 0;
var __1 = require("../");
var RecurringEntity_1 = require("./RecurringEntity");
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Adds a payment method to the customer
     *
     * @param paymentId An application derived ID for the payment method
     * @param paymentMethod The payment method
     * @returns RecurringPaymentMethod
     */
    Customer.prototype.addPaymentMethod = function (paymentId, paymentMethod) {
        var nameOnAccount = this.firstName + " " + this.lastName;
        if (!this.firstName && !this.lastName) {
            nameOnAccount = this.company;
        }
        var result = new __1.RecurringPaymentMethod(paymentMethod);
        result.address = this.address;
        result.customerKey = this.key;
        result.id = paymentId;
        result.nameOnAccount = nameOnAccount;
        return result;
    };
    return Customer;
}(RecurringEntity_1.RecurringEntity));
exports.Customer = Customer;
