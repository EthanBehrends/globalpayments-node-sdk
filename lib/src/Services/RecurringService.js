"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringService = void 0;
var __1 = require("../");
var RecurringService = /** @class */ (function () {
    function RecurringService() {
    }
    RecurringService.create = function (entity) {
        return new __1.RecurringBuilder(__1.TransactionType.Create, entity).execute();
    };
    RecurringService.delete = function (entity, _force) {
        if (_force === void 0) { _force = false; }
        return new __1.RecurringBuilder(__1.TransactionType.Delete, entity).execute();
    };
    RecurringService.edit = function (entity) {
        return new __1.RecurringBuilder(__1.TransactionType.Edit, entity).execute();
    };
    RecurringService.get = function (key) {
        var entity = key;
        return new __1.RecurringBuilder(__1.TransactionType.Fetch, entity).execute();
    };
    RecurringService.search = function (enity) {
        return new __1.RecurringBuilder(__1.TransactionType.Search, enity);
    };
    return RecurringService;
}());
exports.RecurringService = RecurringService;
