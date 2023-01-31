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
var timeForId = new Date().getTime();
ava_1.default("allow 5-part credentials", function (t) {
    var c = new src_1.ServicesConfig();
    c.username = "123456789";
    c.password = "$Test1234";
    c.siteId = "12345";
    c.deviceId = "123456";
    c.licenseId = "12345";
    c.serviceUrl = "https://cert.api2-c.heartlandportico.com";
    src_1.ServicesContainer.configure(c);
    t.truthy(true);
});
ava_1.default("make PayPlan customer", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, createdCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                handleAuth();
                customer = new src_1.Customer();
                customer.id = "Customer" + timeForId;
                customer.firstName = "John";
                customer.lastName = "Doe";
                customer.status = "Active";
                customer.email = "john.doe@email.com";
                customer.address = new src_1.Address();
                customer.address.streetAddress1 = "123 Main St.";
                customer.address.city = "Dallas";
                customer.address.state = "TX";
                customer.address.postalCode = "98765";
                customer.address.country = "USA";
                customer.workPhone = "5551112222";
                return [4 /*yield*/, customer.create()];
            case 1:
                createdCustomer = _a.sent();
                t.truthy(createdCustomer);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("attach CC payment method to customer", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var foundCustomer, card, ccPaymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                handleAuth();
                return [4 /*yield*/, src_1.Customer.find("Customer" + timeForId)];
            case 1:
                foundCustomer = _a.sent();
                t.truthy(foundCustomer);
                card = new src_1.CreditCardData();
                card.number = "4111111111111111";
                card.expMonth = "12";
                card.expYear = "2025";
                card.cvn = "123";
                return [4 /*yield*/, foundCustomer
                        .addPaymentMethod("Payment" + timeForId, card)
                        .create()];
            case 2:
                ccPaymentMethod = _a.sent();
                t.truthy(ccPaymentMethod);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("attach payment schedule to customer", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var foundCcPaymentMethod, paymentSchedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                handleAuth();
                return [4 /*yield*/, src_1.RecurringPaymentMethod.find("Payment" + timeForId)];
            case 1:
                foundCcPaymentMethod = _a.sent();
                t.truthy(foundCcPaymentMethod);
                return [4 /*yield*/, foundCcPaymentMethod
                        .addSchedule("Schedule" + timeForId)
                        .withStartDate(new Date(2027, 1, 1))
                        .withAmount(30.01)
                        .withFrequency(src_1.ScheduleFrequency.Weekly)
                        .withReprocessingCount(1)
                        .withStatus("Active")
                        .withEmailReceipt(src_1.EmailReceipt.Never)
                        .create()];
            case 2:
                paymentSchedule = _a.sent();
                t.truthy(paymentSchedule);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("edit/deactivate the schedule from above test", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var foundSchedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                handleAuth();
                return [4 /*yield*/, src_1.Schedule.find("Schedule" + timeForId)];
            case 1:
                foundSchedule = _a.sent();
                t.truthy(foundSchedule);
                foundSchedule.status = "Inactive";
                t.truthy(foundSchedule.saveChanges());
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("find and charge payment method", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var foundCcPaymentMethod, chargeResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                handleAuth();
                return [4 /*yield*/, src_1.RecurringPaymentMethod.find("Payment" + timeForId)];
            case 1:
                foundCcPaymentMethod = _a.sent();
                return [4 /*yield*/, foundCcPaymentMethod.charge(12.34)
                        .withCurrency("USD")
                        .execute()];
            case 2:
                chargeResponse = _a.sent();
                t.true(chargeResponse.responseCode == '00');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("find transactions from this new payment method", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var foundCcPaymentMethod, foundTransactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                handleAuth();
                return [4 /*yield*/, src_1.RecurringPaymentMethod.find("Payment" + timeForId)];
            case 1:
                foundCcPaymentMethod = _a.sent();
                return [4 /*yield*/, src_1.ReportingService.findTransactions()
                        .where("PaymentMethodKey", foundCcPaymentMethod.key)
                        .execute()];
            case 2:
                foundTransactions = _a.sent();
                t.true(foundTransactions.length === 2); // one transaction was the CreditAccountVerify from creating the payment method
                return [2 /*return*/];
        }
    });
}); });
function handleAuth() {
    var config = new src_1.ServicesConfig();
    config.secretApiKey = "skapi_cert_MXvdAQB61V4AkyM-x3EJuY6hkEaCzaMimTWav7mVfQ";
    config.serviceUrl = "https://cert.api2.heartlandportico.com";
    src_1.ServicesContainer.configure(config);
}
