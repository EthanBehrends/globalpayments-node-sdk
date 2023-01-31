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
exports.EBTCardData = void 0;
var __1 = require("../");
var EBT_1 = require("./EBT");
var EBTCardData = /** @class */ (function (_super) {
    __extends(EBTCardData, _super);
    function EBTCardData() {
        var _this = _super.call(this) || this;
        _this.cardPresent = false;
        _this.readerPresent = false;
        _this.cvnPresenceIndicator = __1.CvnPresenceIndicator.NotRequested;
        return _this;
    }
    return EBTCardData;
}(EBT_1.EBT));
exports.EBTCardData = EBTCardData;
