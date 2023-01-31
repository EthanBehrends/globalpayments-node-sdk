"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionReference = void 0;
var TransactionReference = /** @class */ (function () {
    function TransactionReference(transactionId) {
        if (transactionId) {
            this.transactionId = transactionId;
        }
    }
    return TransactionReference;
}());
exports.TransactionReference = TransactionReference;
