"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportingService = void 0;
var __1 = require("../");
var ReportingService = /** @class */ (function () {
    function ReportingService() {
    }
    ReportingService.activity = function () {
        return new __1.TransactionReportBuilder(__1.ReportType.Activity);
    };
    ReportingService.transactionDetail = function (transactionId) {
        return new __1.TransactionReportBuilder(__1.ReportType.TransactionDetail).withTransactionId(transactionId);
    };
    ReportingService.findTransactions = function () {
        return new __1.TransactionReportBuilder(__1.ReportType.FindTransactions);
    };
    return ReportingService;
}());
exports.ReportingService = ReportingService;
