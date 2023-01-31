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
exports.Cash = void 0;
var __1 = require("../");
var PaymentMethod_1 = require("./PaymentMethod");
var Cash = /** @class */ (function (_super) {
    __extends(Cash, _super);
    function Cash() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = __1.PaymentMethodType.Cash;
        return _this;
    }
    Cash.prototype.charge = function (_amount) {
        throw new __1.NotImplementedError();
    };
    Cash.prototype.refund = function (_amount) {
        throw new __1.NotImplementedError();
    };
    return Cash;
}(PaymentMethod_1.PaymentMethod));
exports.Cash = Cash;
