"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringEntity = void 0;
var __1 = require("../");
var RecurringEntity = /** @class */ (function () {
    function RecurringEntity() {
    }
    /// <summary>
    /// Searches for a specific record by `id`.
    /// </summary>
    /// <param name="id">The ID of the record to find</summary>
    /// <returns>`TResult` or `null` if the record cannot be found.</returns>
    /// <exception cref="UnsupportedTransactionError">
    /// Thrown when gateway does not support retrieving recurring records.
    /// </exception>
    RecurringEntity.find = function (id) {
        var client = __1.ServicesContainer.instance().getRecurringClient();
        if (!client.supportsRetrieval) {
            throw new __1.UnsupportedTransactionError();
        }
        var identifier = RecurringEntity.getIdentifierName(this);
        return __1.RecurringService.search(this)
            .addSearchCriteria(identifier, id)
            .execute()
            .then(function (response) {
            if (!response) {
                return;
            }
            var entity = response[0] || response;
            if (entity) {
                return __1.RecurringService.get(entity);
            }
            return;
        });
    };
    /// <summary>
    /// Lists all records of type `TResult`.
    /// </summary>
    /// <exception cref="UnsupportedTransactionError">
    /// Thrown when gateway does not support retrieving recurring records.
    /// </exception>
    RecurringEntity.findAll = function () {
        var client = __1.ServicesContainer.instance().getRecurringClient();
        if (client.supportsRetrieval) {
            return __1.RecurringService.search(this).execute();
        }
        throw new __1.UnsupportedTransactionError();
    };
    RecurringEntity.getIdentifierName = function (fn) {
        if (fn.name === 'Customer') {
            return "customerIdentifier";
        }
        else if (fn.name === 'RecurringPaymentMethod') {
            return "paymentMethodIdentifier";
        }
        return "scheduleIdentifier";
    };
    /// <summary>
    /// Creates a resource
    /// </summary>
    /// <returns>TResult</returns>
    RecurringEntity.prototype.create = function () {
        return __1.RecurringService.create(this);
    };
    /// <summary>
    /// Delete a record from the gateway.
    /// </summary>
    /// <param name="force">Indicates if the deletion should be forced</summary>
    /// <exception cref="ApiException">Thrown when the record cannot be deleted.</exception>
    RecurringEntity.prototype.delete = function (force) {
        if (force === void 0) { force = false; }
        return __1.RecurringService.delete(this, force);
    };
    /// <summary>
    /// The current record should be updated.
    /// </summary>
    /// <remarks>
    /// Any modified properties will be persisted with the gateway.
    /// </remarks>
    /// <exception cref="ApiException">Thrown when the record cannot be updated.</exception>
    RecurringEntity.prototype.saveChanges = function () {
        return __1.RecurringService.edit(this);
    };
    return RecurringEntity;
}());
exports.RecurringEntity = RecurringEntity;
