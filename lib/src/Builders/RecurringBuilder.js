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
exports.RecurringBuilder = void 0;
var __1 = require("../");
var TransactionBuilder_1 = require("./TransactionBuilder");
var RecurringBuilder = /** @class */ (function (_super) {
    __extends(RecurringBuilder, _super);
    function RecurringBuilder(type, entity) {
        var _this = _super.call(this, type) || this;
        _this.searchCriteria = {};
        if (entity) {
            _this.entity = entity;
            _this.key = entity.key;
        }
        return _this;
    }
    RecurringBuilder.prototype.addSearchCriteria = function (key, value) {
        this.searchCriteria[key] = value;
        return this;
    };
    RecurringBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return __1.ServicesContainer.instance()
            .getRecurringClient()
            .processRecurring(this);
    };
    RecurringBuilder.prototype.setupValidations = function () {
        // todo
    };
    return RecurringBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.RecurringBuilder = RecurringBuilder;
