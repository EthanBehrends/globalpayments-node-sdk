"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var src_1 = require("../../../../src/");
var config = new src_1.ServicesConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
config.hostedPaymentConfig = new src_1.HostedPaymentConfig();
config.hostedPaymentConfig.language = "GB";
config.hostedPaymentConfig.responseUrl = "http://requestb.in/10q2bjb1";
var test = ava_1.default.serial;
var service = new src_1.HostedService(config);
var address = new src_1.Address();
address.postalCode = "123|56";
address.country = "IRELAND";
test("credit auth", function (t) {
    t.plan(1);
    var json = service
        .authorize(1)
        .withCurrency("EUR")
        .withCustomerId("123456")
        .withAddress(address)
        .serialize();
    t.truthy(json);
});
test("credit sale", function (t) {
    t.plan(1);
    var json = service
        .charge(1)
        .withCurrency("EUR")
        .withCustomerId("123456")
        .withAddress(address)
        .serialize();
    t.truthy(json);
});
test("credit verify", function (t) {
    t.plan(1);
    var json = service
        .verify(1)
        .withCurrency("EUR")
        .withCustomerId("123456")
        .withAddress(address)
        .serialize();
    t.truthy(json);
});
test("auth no amount", function (t) {
    t.plan(2);
    var error = t.throws(function () {
        service
            .authorize(undefined)
            .withCurrency("USD")
            .serialize();
    }, src_1.BuilderError);
    t.truthy(error.message);
});
test("auth no currency", function (t) {
    t.plan(2);
    var error = t.throws(function () {
        service.authorize(10).serialize();
    }, src_1.BuilderError);
    t.truthy(error.message);
});
test("sale no amount", function (t) {
    t.plan(2);
    var error = t.throws(function () {
        service
            .charge(undefined)
            .withCurrency("USD")
            .serialize();
    }, src_1.BuilderError);
    t.truthy(error.message);
});
test("sale no currency", function (t) {
    t.plan(2);
    var error = t.throws(function () {
        service.authorize(10).serialize();
    }, src_1.BuilderError);
    t.truthy(error.message);
});
test("verify no currency", function (t) {
    t.plan(2);
    var error = t.throws(function () {
        service.verify().serialize();
    }, src_1.BuilderError);
    t.truthy(error.message);
});
test("verify with amount", function (t) {
    t.plan(2);
    var error = t.throws(function () {
        service
            .verify()
            .withAmount(10)
            .serialize();
    }, src_1.BuilderError);
    t.truthy(error.message);
});
