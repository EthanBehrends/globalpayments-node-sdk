"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedService = void 0;
var __1 = require("../");
var HostedService = /** @class */ (function () {
    function HostedService(config) {
        this.config = config;
        __1.ServicesContainer.configure(config);
    }
    HostedService.prototype.authorize = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Auth).withAmount(amount);
    };
    HostedService.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale).withAmount(amount);
    };
    HostedService.prototype.verify = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Verify).withAmount(amount);
    };
    HostedService.prototype.parseResponse = function (json, encoded) {
        if (encoded === void 0) { encoded = true; }
        var response = JSON.parse(json);
        var decoder = encoded ? __1.StringUtils.atob : function (t) { return t; };
        var timestamp = decoder(response.TIMESTAMP);
        var merchantId = decoder(response.MERCHANT_ID);
        var orderId = decoder(response.ORDER_ID);
        var result = decoder(response.RESULT);
        var message = decoder(response.MESSAGE);
        var transactionId = decoder(response.PASREF);
        var authCode = decoder(response.AUTHCODE);
        var sha1Hash = decoder(response.SHA1HASH);
        var hash = __1.GenerationUtils.generateHash([
            timestamp,
            merchantId,
            orderId,
            result,
            message,
            transactionId,
            authCode,
        ].join("."), this.config.sharedSecret);
        if (hash !== sha1Hash) {
            throw new __1.ApiError("Incorrect hash. Please check your code and the Developers Documentation.");
        }
        var transaction = new __1.Transaction();
        transaction.authorizedAmount = decoder(response.AMOUNT);
        transaction.cvnResponseCode = decoder(response.CVNRESULT);
        transaction.responseCode = result;
        transaction.responseMessage = message;
        transaction.avsResponseCode = decoder(response.AVSPOSTCODERESULT);
        transaction.transactionReference = new __1.TransactionReference();
        transaction.transactionReference.authCode = authCode;
        transaction.transactionReference.orderId = orderId;
        transaction.transactionReference.paymentMethodType =
            __1.PaymentMethodType.Credit;
        transaction.transactionReference.transactionId = transactionId;
        return transaction;
    };
    return HostedService;
}());
exports.HostedService = HostedService;
