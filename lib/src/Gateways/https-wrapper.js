"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
var https = require("https");
var Errors_1 = require("../Entities/Errors");
var request = function (data, options) {
    return new Promise(function (resolve, reject) {
        if (options === undefined) {
            options = {};
        }
        var req = https.request(options, function (res) {
            var responseData = "";
            res.on("data", function (d) { return (responseData += d); });
            res.on("end", function () {
                if (res.statusCode !== 200) {
                    reject(new Errors_1.GatewayError("Unexpected HTTP status code [" + res.statusCode + "]"));
                }
                resolve(responseData);
            });
            res.on("error", reject);
        });
        req.on("socket", function (socket) {
            socket.on("timeout", function () {
                req.abort();
                reject(new Errors_1.ApiError("Socket timeout occurred."));
            });
        });
        req.on("error", reject);
        if (data !== undefined) {
            req.write(data);
        }
        req.end();
    });
};
exports.request = request;
