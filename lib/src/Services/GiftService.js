"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftService = void 0;
var __1 = require("../");
var GiftService = /** @class */ (function () {
    function GiftService(config) {
        __1.ServicesContainer.configure(config);
    }
    GiftService.prototype.activate = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Activate).withAmount(amount);
    };
    GiftService.prototype.addValue = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.AddValue).withAmount(amount);
    };
    GiftService.prototype.addAlias = function (phoneNumber) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Alias).withAlias(__1.AliasAction.Add, phoneNumber);
    };
    GiftService.prototype.balanceInquiry = function (type) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Balance).withBalanceInquiryType(type);
    };
    GiftService.prototype.charge = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Sale).withAmount(amount);
    };
    GiftService.prototype.create = function (phoneNumber) {
        return __1.GiftCard.create(phoneNumber);
    };
    GiftService.prototype.deactivate = function () {
        return new __1.AuthorizationBuilder(__1.TransactionType.Deactivate);
    };
    GiftService.prototype.removeAlias = function (phoneNumber) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Alias).withAlias(__1.AliasAction.Delete, phoneNumber);
    };
    GiftService.prototype.replaceWith = function (newCard) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Replace).withReplacementCard(newCard);
    };
    GiftService.prototype.reverse = function (amount) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Gift;
        return new __1.AuthorizationBuilder(__1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    GiftService.prototype.rewards = function (amount) {
        return new __1.AuthorizationBuilder(__1.TransactionType.Reward).withAmount(amount);
    };
    GiftService.prototype.void = function (transactionId) {
        var ref = new __1.TransactionReference();
        ref.paymentMethodType = __1.PaymentMethodType.Gift;
        ref.transactionId = transactionId;
        return new __1.ManagementBuilder(__1.TransactionType.Void).withPaymentMethod(ref);
    };
    return GiftService;
}());
exports.GiftService = GiftService;
