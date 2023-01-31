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
exports.RecurringPaymentMethod = void 0;
var __1 = require("../");
var Entities_1 = require("../Entities");
var RecurringPaymentMethod = /** @class */ (function (_super) {
    __extends(RecurringPaymentMethod, _super);
    function RecurringPaymentMethod(customerIdOrPaymentMethod, paymentId) {
        var _this = _super.call(this) || this;
        _this.paymentMethodType = __1.PaymentMethodType.Recurring;
        if (customerIdOrPaymentMethod &&
            (typeof customerIdOrPaymentMethod === "string" ||
                customerIdOrPaymentMethod instanceof String)) {
            _this.paymentType = "Credit Card";
            _this.customerKey = customerIdOrPaymentMethod;
            if (paymentId) {
                _this.key = paymentId;
            }
        }
        else if (customerIdOrPaymentMethod) {
            _this._paymentMethod = customerIdOrPaymentMethod;
        }
        return _this;
    }
    Object.defineProperty(RecurringPaymentMethod.prototype, "paymentMethod", {
        get: function () {
            return this._paymentMethod;
        },
        set: function (value) {
            var client = __1.ServicesContainer.instance().getRecurringClient();
            if (!client.supportsUpdatePaymentDetails) {
                throw new __1.UnsupportedTransactionError();
            }
            this._paymentMethod = value;
        },
        enumerable: false,
        configurable: true
    });
    RecurringPaymentMethod.prototype.authorize = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Auth, this)
            .withAmount(amount)
            .withOneTimePayment(true);
    };
    RecurringPaymentMethod.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale, this)
            .withAmount(amount)
            .withOneTimePayment(true);
    };
    RecurringPaymentMethod.prototype.refund = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Refund, this).withAmount(amount);
    };
    RecurringPaymentMethod.prototype.verify = function () {
        return new __1.AuthorizationBuilder(__1.TransactionType.Verify, this);
    };
    RecurringPaymentMethod.prototype.addSchedule = function (scheduleId) {
        var schedule = new __1.Schedule(this.customerKey, this.key);
        schedule.id = scheduleId;
        return schedule;
    };
    return RecurringPaymentMethod;
}(Entities_1.RecurringEntity));
exports.RecurringPaymentMethod = RecurringPaymentMethod;
