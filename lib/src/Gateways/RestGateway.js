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
exports.RestGateway = void 0;
var Gateway_1 = require("./Gateway");
var RestGateway = /** @class */ (function (_super) {
    __extends(RestGateway, _super);
    function RestGateway() {
        return _super.call(this, "application/json") || this;
    }
    RestGateway.prototype.doTransaction = function (verb, endpoint, requestData) {
        return this.sendRequest(verb, endpoint, requestData);
    };
    RestGateway.AUTHORIZATION_HEADER = "Authorization";
    return RestGateway;
}(Gateway_1.Gateway));
exports.RestGateway = RestGateway;
