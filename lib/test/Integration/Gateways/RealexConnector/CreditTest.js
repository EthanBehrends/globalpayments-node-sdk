"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var src_1 = require("../../../../src/");
var config = new src_1.ServicesConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.rebatePassword = "rebate";
config.refundPassword = "refund";
config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
var card = new src_1.CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";
ava_1.default.before(function (_t) {
    src_1.ServicesContainer.configure(config);
});
ava_1.default("credit authorization", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, capture;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize("14")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                authorization = _a.sent();
                t.truthy(authorization);
                t.is(authorization.responseCode, "00", authorization.responseMessage);
                return [4 /*yield*/, authorization
                        .capture("16")
                        .withGratuity("2")
                        .execute()];
            case 2:
                capture = _a.sent();
                t.truthy(capture);
                t.is(capture.responseCode, "00", capture.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit sale", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .charge(15)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit sale with recurring", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .charge(15)
                        .withCurrency("USD")
                        .withRecurringInfo(src_1.RecurringType.Fixed, src_1.RecurringSequence.First)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit refund", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .refund(16)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit rebate", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var response, rebate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .charge(17)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [4 /*yield*/, response
                        .refund(17)
                        .withCurrency("USD")
                        .execute()];
            case 2:
                rebate = _a.sent();
                t.truthy(rebate);
                t.is(rebate.responseCode, "00", rebate.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit void", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var response, voidResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .charge(15)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [4 /*yield*/, response.void().execute()];
            case 2:
                voidResponse = _a.sent();
                t.truthy(voidResponse);
                t.is(voidResponse.responseCode, "00", voidResponse.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit verify", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .verify()
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit auth mobile - apple pay", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedCard, incorrectHashError, cannotDecryptError;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(6);
                encryptedCard = new src_1.CreditCardData();
                // tslint:disable-next-line:max-line-length
                encryptedCard.token = "{\"version\":\"EC_v1\",\"data\":\"Ft+dvMNzlcy6WNB+zerKtkh/RWW4RWW4yXIRgmM3WC/FYEC6Z+OJEzir2sDyzDkjIUJ0TFCQd/QAAAAAAAA==\",\"header\":{\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWdNhNAHy9kO2Kol33kIh7k6wh6E/lxriM46MR1FUrn7SHugprkaeFmWKZPgGpWgZ+telY/G1+YSoaCbR5YSoaCbR57bdGA==\",\"transactionId\":\"fd88874954acdb299c285f95a3202ad1f330d3fd4ebc22a864398684198644c3\",\"publicKeyHash\":\"h7WnNVz2gmpTSkHqETOWsskFPLSj31e3sPTS2cBxgrk=\"}}";
                encryptedCard.mobileType = "apple-pay";
                return [4 /*yield*/, t.throws(encryptedCard
                        .authorize(10)
                        .withCurrency("USD")
                        .withModifier(src_1.TransactionModifier.EncryptedMobile)
                        .withAllowDuplicates(true)
                        .execute(), src_1.GatewayError)];
            case 1:
                incorrectHashError = _a.sent();
                t.truthy(incorrectHashError);
                t.is(incorrectHashError.responseCode, "505", incorrectHashError.responseMessage);
                return [4 /*yield*/, t.throws(encryptedCard
                        .authorize()
                        .withModifier(src_1.TransactionModifier.EncryptedMobile)
                        .withAllowDuplicates(true)
                        .execute(), src_1.GatewayError)];
            case 2:
                cannotDecryptError = _a.sent();
                t.truthy(cannotDecryptError);
                t.is(cannotDecryptError.responseCode, "515", cannotDecryptError.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit auth mobile - google pay", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedCard, missingAmountError, invalidTokenError;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(6);
                encryptedCard = new src_1.CreditCardData();
                // tslint:disable-next-line:max-line-length
                encryptedCard.token = "{\"signature\":\"MEUCIQDapDDJyf9lH3ztEWksgAjNe...AXjW+ZM+Ut2BWoTExppDDPc1a9Z7U=\",\"protocolVersion\":\"ECv1\",\"signedMessage\":\"{\"encryptedMessage\":\"VkqwkFuMdXp...TZQxVMnkTeJjwyc4\\u003d\",\"ephemeralPublicKey\":\"BMglUoKZWxgB...YCiBNkLaMTD9G4sec\\u003d\",\"tag\":\"4VYypqW2Q5FN7UP87QNDGsLgc48vAe5+AcjR+BxQ2Zo\\u003d\"}\"}";
                encryptedCard.mobileType = "pay-with-google";
                return [4 /*yield*/, t.throws(encryptedCard
                        .authorize()
                        .withModifier(src_1.TransactionModifier.EncryptedMobile)
                        .withAllowDuplicates(true)
                        .execute(), src_1.GatewayError)];
            case 1:
                missingAmountError = _a.sent();
                t.truthy(missingAmountError);
                t.is(missingAmountError.responseCode, "502", missingAmountError.responseMessage);
                return [4 /*yield*/, t.throws(encryptedCard
                        .authorize(10)
                        .withCurrency("USD")
                        .withModifier(src_1.TransactionModifier.EncryptedMobile)
                        .withAllowDuplicates(true)
                        .execute(), src_1.GatewayError)];
            case 2:
                invalidTokenError = _a.sent();
                t.truthy(invalidTokenError);
                t.is(invalidTokenError.responseCode, "509", invalidTokenError.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("implied decimal conversion", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var responseNumber1, responseNumber2, responseString1, responseString2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(8);
                return [4 /*yield*/, card
                        .charge(78.68)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                responseNumber1 = _a.sent();
                t.truthy(responseNumber1);
                t.is(responseNumber1.responseCode, "00", responseNumber1.responseMessage);
                return [4 /*yield*/, card
                        .charge(78.68000000000001)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 2:
                responseNumber2 = _a.sent();
                t.truthy(responseNumber2);
                t.is(responseNumber2.responseCode, "00", responseNumber2.responseMessage);
                return [4 /*yield*/, card
                        .charge("78.68")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 3:
                responseString1 = _a.sent();
                t.truthy(responseString1);
                t.is(responseString1.responseCode, "00", responseString1.responseMessage);
                return [4 /*yield*/, card
                        .charge("78.68000000000001")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 4:
                responseString2 = _a.sent();
                t.truthy(responseString2);
                t.is(responseString2.responseCode, "00", responseString2.responseMessage);
                return [2 /*return*/];
        }
    });
}); });