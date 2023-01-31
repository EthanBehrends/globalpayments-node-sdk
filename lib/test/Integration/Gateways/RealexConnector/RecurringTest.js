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
var test = ava_1.default.serial;
var card = new src_1.CreditCardData();
card.number = "4263970000005262";
card.expMonth = "5";
card.expYear = "2019";
card.cardHolderName = "James Mason";
var customerId = src_1.GenerationUtils.generateTimestamp() + "-Realex";
var paymentId = function (t) {
    return src_1.GenerationUtils.generateTimestamp() + "-Realex-" + t;
};
var customer = new src_1.Customer();
customer.key = customerId;
customer.title = "Mr.";
customer.firstName = "James";
customer.lastName = "Mason";
customer.company = "Realex Payments";
customer.address = new src_1.Address();
customer.address.streetAddress1 = "Flat 123";
customer.address.streetAddress2 = "House 456";
customer.address.streetAddress3 = "The Cul-De-Sac";
customer.address.city = "Halifax";
customer.address.province = "West Yorkshire";
customer.address.postalCode = "W6 9HR";
customer.address.country = "United Kingdom";
customer.homePhone = "+35312345678";
customer.workPhone = "+3531987654321";
customer.fax = "+124546871258";
customer.mobilePhone = "+25544778544";
customer.email = "text@example.com";
customer.comments = "Campaign Ref E7373G";
test.before(function (_t) {
    src_1.ServicesContainer.configure(config);
});
test("001a - create customer", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var newCustomer, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, customer.create()];
            case 2:
                newCustomer = _a.sent();
                t.truthy(newCustomer);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                if (e_1.responseCode !== "520") {
                    t.fail(e_1.message);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
test("001b - create payment method", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentMethod, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, customer.addPaymentMethod(paymentId("Credit"), card)];
            case 2:
                paymentMethod = _a.sent();
                t.truthy(paymentMethod);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                if (e_2.responseCode !== "520") {
                    t.fail(e_2.message);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
test("002a - edit customer from id", function (_t) { return __awaiter(void 0, void 0, void 0, function () {
    var editCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                editCustomer = new src_1.Customer();
                editCustomer.key = customerId;
                return [4 /*yield*/, customer.saveChanges()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("002b - edit payment method from id", function (_t) { return __awaiter(void 0, void 0, void 0, function () {
    var newCard, paymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newCard = new src_1.CreditCardData();
                newCard.number = "5425230000004415";
                newCard.expMonth = "10";
                newCard.expYear = "2020";
                newCard.cardHolderName = "Philip Marlowe";
                paymentMethod = new src_1.RecurringPaymentMethod(customerId, paymentId("Credit"));
                paymentMethod.paymentMethod = newCard;
                return [4 /*yield*/, paymentMethod.saveChanges()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("003 - find", function (_t) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, src_1.Customer.find(customerId)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("004a - charge stored card", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentMethod, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                paymentMethod = new src_1.RecurringPaymentMethod(customerId, paymentId("Credit"));
                return [4 /*yield*/, paymentMethod
                        .charge(10)
                        .withCurrency("USD")
                        .withCvn("123")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("004b - verify stored card", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentMethod, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                paymentMethod = new src_1.RecurringPaymentMethod(customerId, paymentId("Credit"));
                return [4 /*yield*/, paymentMethod
                        .verify()
                        .withCvn("123")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("004c - refund stored card", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentMethod, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                paymentMethod = new src_1.RecurringPaymentMethod(customerId, paymentId("Credit"));
                return [4 /*yield*/, paymentMethod
                        .refund(10.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("005 - delete payment method", function (_t) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paymentMethod = new src_1.RecurringPaymentMethod(customerId, paymentId("Credit"));
                return [4 /*yield*/, paymentMethod.delete()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("006 - recurring payment", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentMethod, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                paymentMethod = new src_1.RecurringPaymentMethod(customerId, paymentId("Credit"));
                return [4 /*yield*/, paymentMethod
                        .charge(12)
                        .withRecurringInfo(src_1.RecurringType.Fixed, src_1.RecurringSequence.First)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
