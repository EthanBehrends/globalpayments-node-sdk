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
exports.TransactionReportBuilder = void 0;
var __1 = require("../");
var ReportBuilder_1 = require("./ReportBuilder");
var TransactionReportBuilder = /** @class */ (function (_super) {
    __extends(TransactionReportBuilder, _super);
    function TransactionReportBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionReportBuilder.prototype.setupValidations = function () {
        this.validations
            .of("reportType", __1.ReportType.TransactionDetail)
            .check("transactionId")
            .isNotNull()
            .check("transactionId")
            .isNotEmpty()
            .check("deviceId")
            .isNull()
            .check("startDate")
            .isNull()
            .check("endDate")
            .isNull();
        this.validations
            .of("reportType", __1.ReportType.Activity)
            .check("transactionId")
            .isNull();
    };
    TransactionReportBuilder.prototype.withDeviceId = function (deviceId) {
        if (deviceId !== undefined) {
            this.deviceId = deviceId;
        }
        return this;
    };
    TransactionReportBuilder.prototype.withEndDate = function (endDate) {
        if (endDate !== undefined) {
            this.endDate = endDate;
        }
        return this;
    };
    TransactionReportBuilder.prototype.withStartDate = function (startDate) {
        if (startDate !== undefined) {
            this.startDate = startDate;
        }
        return this;
    };
    TransactionReportBuilder.prototype.withTransactionId = function (transactionId) {
        if (transactionId !== undefined) {
            this.transactionId = transactionId;
        }
        return this;
    };
    TransactionReportBuilder.prototype.where = function (criteria, value) {
        if (criteria !== undefined && value !== undefined) {
            if (this.searchCriteria == undefined) {
                this.searchCriteria = {};
            }
            this.searchCriteria[criteria] = value;
        }
        return this;
    };
    return TransactionReportBuilder;
}(ReportBuilder_1.ReportBuilder));
exports.TransactionReportBuilder = TransactionReportBuilder;
