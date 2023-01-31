"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = void 0;
var __1 = require("../");
var BatchService = /** @class */ (function () {
    function BatchService() {
    }
    BatchService.closeBatch = function () {
        return new __1.ManagementBuilder(__1.TransactionType.BatchClose)
            .execute()
            .then(function (_response) {
            return new __1.BatchSummary();
        });
    };
    return BatchService;
}());
exports.BatchService = BatchService;
