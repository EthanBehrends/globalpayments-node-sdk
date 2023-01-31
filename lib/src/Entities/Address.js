"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var Address = /** @class */ (function () {
    function Address() {
    }
    Object.defineProperty(Address.prototype, "state", {
        get: function () {
            return this.province;
        },
        set: function (value) {
            this.province = value;
        },
        enumerable: false,
        configurable: true
    });
    return Address;
}());
exports.Address = Address;
