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
exports.PorticoConnector = void 0;
var elementtree_1 = require("@azz/elementtree");
var __1 = require("../");
var InputValidation_1 = require("../Utils/InputValidation");
var XmlGateway_1 = require("./XmlGateway");
var PorticoConnector = /** @class */ (function (_super) {
    __extends(PorticoConnector, _super);
    function PorticoConnector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportsHostedPayments = false;
        return _this;
    }
    PorticoConnector.prototype.processAuthorization = function (builder) {
        var _this = this;
        // build request
        var transaction = elementtree_1.Element(this.mapRequestType(builder));
        var block1 = elementtree_1.SubElement(transaction, "Block1");
        var allowDuplicates;
        if (builder.transactionType === __1.TransactionType.Sale ||
            builder.transactionType === __1.TransactionType.Auth) {
            if (builder.paymentMethod.paymentMethodType !== __1.PaymentMethodType.Gift &&
                builder.paymentMethod.paymentMethodType !== __1.PaymentMethodType.ACH) {
                allowDuplicates = elementtree_1.SubElement(block1, "AllowDup");
                allowDuplicates.append(elementtree_1.CData(builder.allowDuplicates ? "Y" : "N"));
                if (builder.transactionModifier === __1.TransactionModifier.None &&
                    builder.paymentMethod.paymentMethodType !== __1.PaymentMethodType.EBT &&
                    builder.paymentMethod.paymentMethodType !==
                        __1.PaymentMethodType.Recurring) {
                    elementtree_1.SubElement(block1, "AllowPartialAuth").append(elementtree_1.CData(builder.allowPartialAuth ? "Y" : "N"));
                }
            }
        }
        if (builder.amount !== undefined && builder.amount !== "") {
            elementtree_1.SubElement(block1, "Amt").append(elementtree_1.CData(InputValidation_1.validateAmount("portico", builder.amount)));
        }
        if (builder.gratuity) {
            elementtree_1.SubElement(block1, "GratuityAmtInfo").append(elementtree_1.CData(InputValidation_1.validateAmount("portico", builder.gratuity)));
        }
        if (builder.convenienceAmt) {
            elementtree_1.SubElement(block1, "ConvenienceAmtInfo").append(elementtree_1.CData(InputValidation_1.validateAmount("portico", builder.convenienceAmt)));
        }
        if (builder.shippingAmt) {
            elementtree_1.SubElement(block1, "ShippingAmtInfo").append(elementtree_1.CData(InputValidation_1.validateAmount("portico", builder.shippingAmt)));
        }
        if (builder.surchargeAmt) {
            elementtree_1.SubElement(block1, "SurchargeAmtInfo").append(elementtree_1.CData(InputValidation_1.validateAmount("portico", builder.shippingAmt)));
        }
        if (builder.cashBackAmount !== undefined && builder.cashBackAmount !== "") {
            elementtree_1.SubElement(block1, 
            // because plano
            builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Debit
                ? "CashbackAmtInfo"
                : "CashBackAmount").append(elementtree_1.CData(InputValidation_1.validateAmount("portico", builder.cashBackAmount)));
        }
        if (builder.offlineAuthCode) {
            elementtree_1.SubElement(block1, "OfflineAuthCode").append(elementtree_1.CData(builder.offlineAuthCode));
        }
        if (builder.transactionType === __1.TransactionType.Alias) {
            elementtree_1.SubElement(block1, "Action").append(elementtree_1.CData(builder.aliasAction.toString()));
            elementtree_1.SubElement(block1, "Alias").append(elementtree_1.CData(builder.alias));
        }
        var isCheck = builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.ACH;
        var property = isCheck ? "checkHolderName" : "cardHolderName";
        if (builder.transactionType !== __1.TransactionType.Reversal && (isCheck || builder.billingAddress || builder.paymentMethod[property])) {
            var holder = elementtree_1.SubElement(block1, isCheck ? "ConsumerInfo" : "CardHolderData");
            var pm = builder.paymentMethod;
            if (pm[property]) {
                var names = pm[property].split(" ", 2);
                elementtree_1.SubElement(holder, isCheck ? "FirstName" : "CardHolderFirstName").append(elementtree_1.CData(InputValidation_1.validateInput("portico", "firstName", names[0])));
                if (names[1]) {
                    elementtree_1.SubElement(holder, isCheck ? "LastName" : "CardHolderLastName").append(elementtree_1.CData(InputValidation_1.validateInput("portico", "lastName", names[1])));
                }
            }
            if (builder.billingAddress) {
                elementtree_1.SubElement(holder, isCheck ? "Address1" : "CardHolderAddr").append(elementtree_1.CData(builder.billingAddress.streetAddress1));
                elementtree_1.SubElement(holder, isCheck ? "City" : "CardHolderCity").append(elementtree_1.CData(InputValidation_1.validateInput("portico", "city", builder.billingAddress.city)));
                elementtree_1.SubElement(holder, isCheck ? "State" : "CardHolderState").append(elementtree_1.CData(InputValidation_1.validateInput("portico", "province", builder.billingAddress.province || builder.billingAddress.state)));
                elementtree_1.SubElement(holder, isCheck ? "Zip" : "CardHolderZip").append(elementtree_1.CData(InputValidation_1.validateInput("portico", "postalCode", builder.billingAddress.postalCode)));
            }
            if (isCheck) {
                var check = builder.paymentMethod;
                elementtree_1.SubElement(holder, "CheckName").append(elementtree_1.CData(check.checkName || check.checkHolderName));
                elementtree_1.SubElement(holder, "PhoneNumber").append(elementtree_1.CData(InputValidation_1.validateInput("portico", "phoneNumber", check.phoneNumber)));
                elementtree_1.SubElement(holder, "DLNumber").append(elementtree_1.CData(check.driversLicenseNumber));
                elementtree_1.SubElement(holder, "DLState").append(elementtree_1.CData(check.driversLicenseState));
                if (check.ssnLast4 || check.birthYear) {
                    var identity = elementtree_1.SubElement(holder, "IdentityInfo");
                    elementtree_1.SubElement(identity, "SSNL4").append(elementtree_1.CData(check.ssnLast4));
                    elementtree_1.SubElement(identity, "DOBYear").append(elementtree_1.CData(check.birthYear));
                }
            }
        }
        var _a = this.hasToken(builder.paymentMethod), hasToken = _a.hasToken, tokenValue = _a.tokenValue;
        var cardData;
        if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Debit ||
            builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.ACH) {
            cardData = block1;
        }
        else {
            cardData = elementtree_1.Element("CardData");
        }
        if (builder.paymentMethod.isCardData) {
            var card = builder.paymentMethod;
            var manualEntry = elementtree_1.SubElement(cardData, hasToken ? "TokenData" : "ManualEntry");
            if (this.shouldIncludeCredentialOnFile(builder) && (builder.cardBrandTransactionId || builder.transactionInitiator)) {
                block1.append(this.hydrateCredentialOnFile(builder));
            }
            elementtree_1.SubElement(manualEntry, hasToken ? "TokenValue" : "CardNbr").append(elementtree_1.CData(tokenValue || card.number));
            if (card.expMonth) {
                elementtree_1.SubElement(manualEntry, "ExpMonth").append(elementtree_1.CData(card.expMonth.toString()));
            }
            if (card.expYear) {
                elementtree_1.SubElement(manualEntry, "ExpYear").append(elementtree_1.CData(card.expYear.toString()));
            }
            if (card.cvn) {
                elementtree_1.SubElement(manualEntry, "CVV2").append(elementtree_1.CData(card.cvn));
            }
            elementtree_1.SubElement(manualEntry, "ReaderPresent").append(elementtree_1.CData(card.readerPresent ? "Y" : "N"));
            elementtree_1.SubElement(manualEntry, "CardPresent").append(elementtree_1.CData(card.cardPresent ? "Y" : "N"));
            block1.append(cardData);
            if (card instanceof __1.CreditCardData) {
                var creditCardData = card;
                //  WalletData Element
                if ((creditCardData.mobileType == __1.MobilePaymentMethodType.APPLEPAY
                    || creditCardData.mobileType == __1.MobilePaymentMethodType.GOOGLEPAY)
                    && typeof creditCardData.paymentSource != "undefined"
                    && this.isAppleOrGooglePay(creditCardData.paymentSource)) {
                    var walletData = elementtree_1.SubElement(block1, "WalletData");
                    elementtree_1.SubElement(walletData, "PaymentSource").append(elementtree_1.CData(creditCardData.paymentSource.trim()));
                    if (typeof creditCardData.mobileType != "undefined") {
                        elementtree_1.SubElement(walletData, "DigitalPaymentToken").append(elementtree_1.CData(creditCardData.token));
                        block1.remove(cardData);
                    }
                }
            }
            if (builder.transactionModifier === __1.TransactionModifier.Recurring) {
                var recurring = elementtree_1.SubElement(block1, "RecurringData");
                elementtree_1.SubElement(recurring, "ScheduleID").append(elementtree_1.CData(builder.scheduleId));
                elementtree_1.SubElement(recurring, "OneTime").append(elementtree_1.CData(builder.oneTimePayment ? "Y" : "N"));
            }
        }
        else if (builder.paymentMethod.isTrackData) {
            var track = builder.paymentMethod;
            var trackData = elementtree_1.SubElement(cardData, hasToken ? "TokenData" : "TrackData");
            if (!hasToken) {
                trackData.append(elementtree_1.CData(track.value));
                if (builder.paymentMethod.paymentMethodType !== __1.PaymentMethodType.Debit) {
                    trackData.set("method", track.entryMethod === __1.EntryMethod.Swipe ? "swipe" : "proximity");
                    block1.append(cardData);
                }
            }
            else if (tokenValue) {
                elementtree_1.SubElement(trackData, "TokenValue").append(elementtree_1.CData(tokenValue));
            }
        }
        else if (builder.paymentMethod instanceof __1.GiftCard) {
            var card = builder.paymentMethod;
            if (builder.currency) {
                elementtree_1.SubElement(block1, "Currency").append(elementtree_1.CData(builder.currency.toUpperCase()));
            }
            // if it's replace, add the new card, and change the card data name to be old card data
            if (builder.transactionType === __1.TransactionType.Replace) {
                var newCardData = elementtree_1.SubElement(block1, "NewCardData");
                elementtree_1.SubElement(newCardData, builder.replacementCard.valueType).append(elementtree_1.CData(builder.replacementCard.value));
                elementtree_1.SubElement(newCardData, "PIN").append(elementtree_1.CData(builder.replacementCard.pin));
                cardData = elementtree_1.Element("OldCardData");
            }
            elementtree_1.SubElement(cardData, card.valueType).append(elementtree_1.CData(card.value));
            if (card.pin) {
                elementtree_1.SubElement(cardData, "PIN").append(elementtree_1.CData(card.pin));
            }
            if (builder.aliasAction !== __1.AliasAction.Create) {
                block1.append(cardData);
            }
        }
        else if (builder.paymentMethod instanceof __1.ECheck) {
            var check = builder.paymentMethod;
            elementtree_1.SubElement(block1, "CheckAction").append(elementtree_1.CData("SALE"));
            if (!hasToken) {
                var accountInfo = elementtree_1.SubElement(block1, "AccountInfo");
                elementtree_1.SubElement(accountInfo, "RoutingNumber").append(elementtree_1.CData(check.routingNumber));
                elementtree_1.SubElement(accountInfo, "AccountNumber").append(elementtree_1.CData(check.accountNumber));
                elementtree_1.SubElement(accountInfo, "CheckNumber").append(elementtree_1.CData(check.checkNumber));
                elementtree_1.SubElement(accountInfo, "MICRData").append(elementtree_1.CData(check.micrNumber));
                elementtree_1.SubElement(accountInfo, "AccountType").append(elementtree_1.CData(check.accountType.toString()));
            }
            else if (tokenValue) {
                elementtree_1.SubElement(block1, "TokenValue").append(elementtree_1.CData(tokenValue));
            }
            elementtree_1.SubElement(block1, "DataEntryMode").append(elementtree_1.CData(check.entryMode.toString().toUpperCase()));
            elementtree_1.SubElement(block1, "CheckType").append(elementtree_1.CData(check.checkType.toString()));
            elementtree_1.SubElement(block1, "SECCode").append(elementtree_1.CData(check.secCode.toString()));
            var verify = elementtree_1.SubElement(block1, "VerifyInfo");
            elementtree_1.SubElement(verify, "CheckVerify").append(elementtree_1.CData(check.checkVerify ? "Y" : "N"));
            elementtree_1.SubElement(verify, "ACHVerify").append(elementtree_1.CData(check.achVerify ? "Y" : "N"));
        }
        if (builder.paymentMethod instanceof __1.TransactionReference) {
            var reference = builder.paymentMethod;
            if (reference.transactionId) {
                elementtree_1.SubElement(block1, "GatewayTxnId").append(elementtree_1.CData(reference.transactionId));
            }
            if (reference.clientTransactionId) {
                elementtree_1.SubElement(block1, "ClientTxnId").append(elementtree_1.CData(reference.clientTransactionId));
            }
        }
        if (builder.paymentMethod instanceof __1.RecurringPaymentMethod) {
            var method = builder.paymentMethod;
            if (method.paymentType === "ACH") {
                if (allowDuplicates) {
                    block1.remove(allowDuplicates);
                }
                elementtree_1.SubElement(block1, "CheckAction").append(elementtree_1.CData("SALE"));
            }
            elementtree_1.SubElement(block1, "PaymentMethodKey").append(elementtree_1.CData(method.key));
            if (method.paymentMethod &&
                method.paymentMethod instanceof __1.CreditCardData) {
                var card = method.paymentMethod;
                var data = elementtree_1.SubElement(block1, "PaymentMethodKeyData");
                elementtree_1.SubElement(data, "ExpMonth").append(elementtree_1.CData(card.expMonth));
                elementtree_1.SubElement(data, "ExpYear").append(elementtree_1.CData(card.expYear));
                elementtree_1.SubElement(data, "CVV2").append(elementtree_1.CData(card.cvn));
                if (this.shouldIncludeCredentialOnFile(builder) && (builder.cardBrandTransactionId || builder.transactionInitiator)) {
                    block1.append(this.hydrateCredentialOnFile(builder));
                }
            }
            var recurring = elementtree_1.SubElement(block1, "RecurringData");
            elementtree_1.SubElement(recurring, "ScheduleID").append(elementtree_1.CData(builder.scheduleId));
            elementtree_1.SubElement(recurring, "OneTime").append(elementtree_1.CData(builder.oneTimePayment ? "Y" : "N"));
        }
        if (builder.paymentMethod.isPinProtected &&
            builder.transactionType !== __1.TransactionType.Reversal) {
            elementtree_1.SubElement(block1, "PinBlock").append(elementtree_1.CData(builder.paymentMethod.pinBlock));
        }
        if (builder.paymentMethod.isEncryptable) {
            var encryptionData = builder.paymentMethod
                .encryptionData;
            if (encryptionData) {
                var enc = elementtree_1.SubElement(cardData, "EncryptionData");
                if (encryptionData.version) {
                    elementtree_1.SubElement(enc, "Version").append(elementtree_1.CData(encryptionData.version));
                }
                if (encryptionData.trackNumber) {
                    elementtree_1.SubElement(enc, "EncryptedTrackNumber").append(elementtree_1.CData(encryptionData.trackNumber));
                }
                if (encryptionData.ktb) {
                    elementtree_1.SubElement(enc, "KTB").append(elementtree_1.CData(encryptionData.ktb));
                }
                if (encryptionData.ksn) {
                    elementtree_1.SubElement(enc, "KSN").append(elementtree_1.CData(encryptionData.ksn));
                }
            }
        }
        if (builder.paymentMethod.isTokenizable &&
            builder.paymentMethod.paymentMethodType !== __1.PaymentMethodType.ACH) {
            elementtree_1.SubElement(cardData, "TokenRequest").append(elementtree_1.CData(builder.requestMultiUseToken ? "Y" : "N"));
        }
        if (builder.paymentMethod.isBalanceable && builder.balanceInquiryType) {
            elementtree_1.SubElement(block1, "BalanceInquiryType").append(elementtree_1.CData(builder.balanceInquiryType.toString()));
        }
        if (builder.level2Request) {
            elementtree_1.SubElement(block1, "CPCReq").append(elementtree_1.CData("Y"));
        }
        if (builder.customerId || builder.description || builder.invoiceNumber) {
            var fields = elementtree_1.SubElement(block1, "AdditionalTxnFields");
            elementtree_1.SubElement(fields, "CustomerID").append(elementtree_1.CData(builder.customerId));
            elementtree_1.SubElement(fields, "Description").append(elementtree_1.CData(builder.description));
            elementtree_1.SubElement(fields, "InvoiceNbr").append(elementtree_1.CData(builder.invoiceNumber));
        }
        if (builder.ecommerceInfo) {
            if (builder.ecommerceInfo.channel) {
                elementtree_1.SubElement(block1, "Ecommerce").append(elementtree_1.CData(builder.ecommerceInfo.channel.toString()));
            }
            if (builder.invoiceNumber || builder.ecommerceInfo.shipMonth) {
                var direct = elementtree_1.SubElement(block1, "DirectMktData");
                elementtree_1.SubElement(direct, "DirectMktInvoiceNbr").append(elementtree_1.CData(builder.invoiceNumber));
                elementtree_1.SubElement(direct, "DirectMktShipDay").append(elementtree_1.CData(builder.ecommerceInfo.shipDay));
                elementtree_1.SubElement(direct, "DirectMktShipMonth").append(elementtree_1.CData(builder.ecommerceInfo.shipMonth));
            }
            if (builder.ecommerceInfo.cavv ||
                builder.ecommerceInfo.eci ||
                builder.ecommerceInfo.xid) {
                var secure = elementtree_1.SubElement(block1, "SecureECommerce");
                elementtree_1.SubElement(secure, "PaymentDataSource").append(elementtree_1.CData(builder.ecommerceInfo.paymentDataSource));
                elementtree_1.SubElement(secure, "TypeOfPaymentData").append(elementtree_1.CData(builder.ecommerceInfo.paymentDataType));
                elementtree_1.SubElement(secure, "PaymentData").append(elementtree_1.CData(builder.ecommerceInfo.cavv));
                elementtree_1.SubElement(secure, "ECommerceIndicator").append(elementtree_1.CData(builder.ecommerceInfo.eci));
                elementtree_1.SubElement(secure, "XID").append(elementtree_1.CData(builder.ecommerceInfo.xid));
            }
        }
        if (builder.dynamicDescriptor) {
            elementtree_1.SubElement(block1, "TxnDescriptor").append(elementtree_1.CData(builder.dynamicDescriptor));
        }
        return this.doTransaction(this.buildEnvelope(transaction, builder.clientTransactionId)).then(function (response) { return _this.mapResponse(response, builder); });
    };
    PorticoConnector.prototype.serializeRequest = function (_builder) {
        throw new __1.UnsupportedTransactionError("Portico does not support hosted payments.");
    };
    PorticoConnector.prototype.manageTransaction = function (builder) {
        var _this = this;
        // build request
        var transaction = elementtree_1.Element(this.mapRequestType(builder));
        if (builder.transactionType !== __1.TransactionType.BatchClose) {
            var root = void 0;
            if (builder.transactionType === __1.TransactionType.Reversal ||
                builder.transactionType === __1.TransactionType.Refund ||
                builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift ||
                builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.ACH) {
                root = new elementtree_1.Element("Block1");
            }
            else {
                root = transaction;
            }
            // amount
            if (builder.amount) {
                elementtree_1.SubElement(root, "Amt").append(elementtree_1.CData(builder.amount.toString()));
            }
            // auth amount
            if (builder.authAmount) {
                elementtree_1.SubElement(root, "AuthAmt").append(elementtree_1.CData(builder.authAmount.toString()));
            }
            // gratuity
            if (builder.gratuity) {
                elementtree_1.SubElement(root, "GratuityAmtInfo").append(elementtree_1.CData(builder.gratuity.toString()));
            }
            if (builder.clientTransactionId) {
                elementtree_1.SubElement(root, "ClientTxnId").append(elementtree_1.CData(builder.clientTransactionId));
            }
            // transaction ID
            if (builder.paymentMethod &&
                builder.paymentMethod
                    .transactionId) {
                var ref = builder.paymentMethod;
                elementtree_1.SubElement(root, "GatewayTxnId").append(elementtree_1.CData(ref.transactionId));
            }
            // level II Data
            if (builder.transactionType === __1.TransactionType.Edit &&
                builder.transactionModifier === __1.TransactionModifier.LevelII) {
                var cpc = elementtree_1.SubElement(root, "CPCData");
                if (builder.poNumber) {
                    elementtree_1.SubElement(cpc, "CardHolderPONbr").append(elementtree_1.CData(builder.poNumber));
                }
                if (builder.taxType) {
                    elementtree_1.SubElement(cpc, "TaxType").append(elementtree_1.CData(this.hydrateTaxType(builder.taxType)));
                }
                if (builder.taxAmount) {
                    elementtree_1.SubElement(cpc, "TaxAmt").append(elementtree_1.CData(builder.taxAmount.toString()));
                }
            }
            if (builder.transactionType === __1.TransactionType.Reversal ||
                builder.transactionType === __1.TransactionType.Refund ||
                builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift ||
                builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.ACH) {
                transaction.append(root);
            }
        }
        return this.doTransaction(this.buildEnvelope(transaction, builder.clientTransactionId)).then(function (response) { return _this.mapResponse(response, builder); });
    };
    PorticoConnector.prototype.processReport = function (builder) {
        var _this = this;
        var transaction = elementtree_1.Element(this.mapReportRequestType(builder));
        if (builder.timeZoneConversion) {
            elementtree_1.SubElement(transaction, "TzConversion").append(elementtree_1.CData(builder.timeZoneConversion.toString()));
        }
        if (builder instanceof __1.TransactionReportBuilder) {
            var trb = builder;
            if (trb.deviceId) {
                elementtree_1.SubElement(transaction, "DeviceId").append(elementtree_1.CData(trb.deviceId));
            }
            if (trb.startDate) {
                elementtree_1.SubElement(transaction, "RptStartUtcDT").append(elementtree_1.CData(trb.startDate.toISOString()));
            }
            if (trb.endDate) {
                elementtree_1.SubElement(transaction, "RptEndUtcDT").append(elementtree_1.CData(trb.endDate.toISOString()));
            }
            if (trb.transactionId) {
                elementtree_1.SubElement(transaction, "TxnId").append(elementtree_1.CData(trb.transactionId));
            }
            if (trb.searchCriteria) {
                var criteriaNode = elementtree_1.Element("Criteria");
                for (var property in trb.searchCriteria) {
                    elementtree_1.SubElement(criteriaNode, property).append(elementtree_1.CData(trb.searchCriteria[property]));
                }
                transaction.append(criteriaNode);
            }
        }
        return this.doTransaction(this.buildEnvelope(transaction)).then(function (response) { return _this.mapReportResponse(response, builder); });
    };
    PorticoConnector.prototype.buildEnvelope = function (transaction, clientTransactionId) {
        var envelope = elementtree_1.Element("soap:Envelope", {
            "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
        });
        var body = elementtree_1.SubElement(envelope, "soap:Body");
        var request = elementtree_1.SubElement(body, "PosRequest", {
            xmlns: PorticoConnector.XmlNamespace,
        });
        var version1 = elementtree_1.SubElement(request, "Ver1.0");
        // header
        var header = elementtree_1.SubElement(version1, "Header");
        if (this.secretApiKey) {
            elementtree_1.SubElement(header, "SecretAPIKey").append(elementtree_1.CData(this.secretApiKey));
        }
        if (this.siteId) {
            elementtree_1.SubElement(header, "SiteId").append(elementtree_1.CData(this.siteId));
        }
        if (this.licenseId) {
            elementtree_1.SubElement(header, "LicenseId").append(elementtree_1.CData(this.licenseId));
        }
        if (this.deviceId) {
            elementtree_1.SubElement(header, "DeviceId").append(elementtree_1.CData(this.deviceId));
        }
        if (this.username) {
            elementtree_1.SubElement(header, "UserName").append(elementtree_1.CData(this.username));
        }
        if (this.password) {
            elementtree_1.SubElement(header, "Password").append(elementtree_1.CData(this.password));
        }
        if (this.developerId) {
            elementtree_1.SubElement(header, "DeveloperID").append(elementtree_1.CData(this.developerId));
        }
        if (this.versionNumber) {
            elementtree_1.SubElement(header, "VersionNbr").append(elementtree_1.CData(this.versionNumber));
        }
        if (clientTransactionId) {
            elementtree_1.SubElement(header, "ClientTxnId").append(elementtree_1.CData(clientTransactionId));
        }
        if (this.sdkNameVersion) {
            elementtree_1.SubElement(header, "SDKNameVersion").append(elementtree_1.CData(this.sdkNameVersion));
        }
        else {
            elementtree_1.SubElement(header, "SDKNameVersion").append(elementtree_1.CData("nodejs-version:" + process.env.npm_package_version));
        }
        // transaction
        elementtree_1.SubElement(version1, "Transaction").append(transaction);
        return new elementtree_1.ElementTree(envelope).write();
    };
    PorticoConnector.prototype.mapRequestType = function (builder) {
        switch (builder.transactionType) {
            case __1.TransactionType.BatchClose:
                return "BatchClose";
            case __1.TransactionType.Decline:
                if (builder.transactionModifier === __1.TransactionModifier.ChipDecline) {
                    return "ChipCardDecline";
                }
                else if (builder.transactionModifier === __1.TransactionModifier.FraudDecline) {
                    return "OverrideFraudDecline";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.Verify:
                if (builder.transactionModifier === __1.TransactionModifier.EncryptedMobile) {
                    throw new __1.UnsupportedTransactionError();
                }
                return "CreditAccountVerify";
            case __1.TransactionType.Capture:
                return "CreditAddToBatch";
            case __1.TransactionType.Auth:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    if (builder.transactionModifier === __1.TransactionModifier.Additional) {
                        return "CreditAdditionalAuth";
                    }
                    else if (builder.transactionModifier === __1.TransactionModifier.Incremental) {
                        return "CreditIncrementalAuth";
                    }
                    else if (builder.paymentMethod.paymentMethodType ===
                        __1.PaymentMethodType.Recurring) {
                        return "RecurringBillingAuth";
                    }
                    else if (builder.transactionModifier === __1.TransactionModifier.EncryptedMobile) {
                        throw new __1.UnsupportedTransactionError();
                    }
                    else if (builder.transactionModifier === __1.TransactionModifier.Offline) {
                        return "CreditOfflineAuth";
                    }
                    return "CreditAuth";
                }
                else if (builder.paymentMethod.paymentMethodType ===
                    __1.PaymentMethodType.Recurring) {
                    return "RecurringBillingAuth";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.Sale:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    if (builder.transactionModifier === __1.TransactionModifier.Offline) {
                        return "CreditOfflineSale";
                    }
                    else if (builder.transactionModifier === __1.TransactionModifier.Recurring) {
                        return "RecurringBilling";
                    }
                    else if (builder.transactionModifier === __1.TransactionModifier.EncryptedMobile) {
                        throw new __1.UnsupportedTransactionError();
                    }
                    else {
                        return "CreditSale";
                    }
                }
                else if (builder.paymentMethod.paymentMethodType ===
                    __1.PaymentMethodType.Recurring) {
                    if (builder.paymentMethod.paymentType === "ACH") {
                        return "CheckSale";
                    }
                    return "RecurringBilling";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Debit) {
                    return "DebitSale";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Cash) {
                    return "CashSale";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.ACH) {
                    return "CheckSale";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.EBT) {
                    if (builder.transactionModifier === __1.TransactionModifier.CashBack) {
                        return "EBTCashBackPurchase";
                    }
                    else if (builder.transactionModifier === __1.TransactionModifier.Voucher) {
                        return "EBTVoucherPurchase";
                    }
                    else {
                        return "EBTFSPurchase";
                    }
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift) {
                    return "GiftCardSale";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.Refund:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    return "CreditReturn";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Debit) {
                    if (builder.paymentMethod instanceof __1.TransactionReference) {
                        throw new __1.UnsupportedTransactionError();
                    }
                    return "DebitReturn";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Cash) {
                    return "CashReturn";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.EBT) {
                    if (builder.paymentMethod instanceof __1.TransactionReference) {
                        throw new __1.UnsupportedTransactionError();
                    }
                    return "EBTFSReturn";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.Reversal:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    return "CreditReversal";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Debit) {
                    if (builder.paymentMethod instanceof __1.TransactionReference) {
                        throw new __1.UnsupportedTransactionError();
                    }
                    return "DebitReversal";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift) {
                    return "GiftCardReversal";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.Edit:
                if (builder.transactionModifier === __1.TransactionModifier.LevelII) {
                    return "CreditCPCEdit";
                }
                return "CreditTxnEdit";
            case __1.TransactionType.Void:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    return "CreditVoid";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.ACH) {
                    return "CheckVoid";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift) {
                    return "GiftCardVoid";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.AddValue:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    return "PrePaidAddValue";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Debit) {
                    return "DebitAddValue";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift) {
                    return "GiftCardAddValue";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.Balance:
                if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Credit) {
                    return "PrePaidBalanceInquiry";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.EBT) {
                    return "EBTBalanceInquiry";
                }
                else if (builder.paymentMethod.paymentMethodType === __1.PaymentMethodType.Gift) {
                    return "GiftCardBalance";
                }
                throw new __1.UnsupportedTransactionError();
            case __1.TransactionType.BenefitWithDrawal:
                return "EBTCashBenefitWithdrawal";
            case __1.TransactionType.Activate:
                return "GiftCardActivate";
            case __1.TransactionType.Alias:
                return "GiftCardAlias";
            case __1.TransactionType.Deactivate:
                return "GiftCardDeactivate";
            case __1.TransactionType.Replace:
                return "GiftCardReplace";
            case __1.TransactionType.Reward:
                return "GiftCardReward";
            default:
                break;
        }
        throw new __1.NotImplementedError();
    };
    PorticoConnector.prototype.mapReportRequestType = function (builder) {
        switch (builder.reportType) {
            case __1.ReportType.Activity:
                return "ReportActivity";
            case __1.ReportType.TransactionDetail:
                return "ReportTxnDetail";
            case __1.ReportType.FindTransactions:
                return "FindTransactions";
            default:
                throw new __1.UnsupportedTransactionError();
        }
    };
    PorticoConnector.prototype.mapResponse = function (rawResponse, builder) {
        var result = new __1.Transaction();
        var root = elementtree_1.XML(rawResponse).find(".//PosResponse");
        var acceptedCodes = ["00", "0", "85", "10"];
        var gatewayRspCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
        var gatewayRspText = root.findtext(".//GatewayRspMsg");
        if (acceptedCodes.indexOf(gatewayRspCode) === -1) {
            throw new __1.GatewayError("Unexpected Gateway Response: " + gatewayRspCode + " - " + gatewayRspText);
        }
        result.responseCode = root.findtext(".//RspCode")
            ? this.normalizeResponse(root.findtext(".//RspCode"))
            : gatewayRspCode;
        result.responseMessage = root.findtext(".//RspText")
            ? root.findtext(".//RspText")
            : gatewayRspText;
        result.authorizedAmount = root.findtext(".//AuthAmt");
        result.availableBalance = root.findtext(".//AvailableBalance");
        result.avsResponseCode = root.findtext(".//AVSRsltCode");
        result.avsResponseMessage = root.findtext(".//AVSRsltText");
        result.balanceAmount = root.findtext(".//BalanceAmt");
        result.cardType = root.findtext(".//CardType");
        result.cardLast4 = root.findtext(".//TokenPANLast4");
        result.cavvResponseCode = root.findtext(".//CAVVResultCode");
        result.commercialIndicator = root.findtext(".//CPCInd");
        result.cvnResponseCode = root.findtext(".//CVVRsltCode");
        result.cvnResponseMessage = root.findtext(".//CVVRsltText");
        result.pointsBalanceAmount = root.findtext(".//PointsBalanceAmt");
        result.recurringDataCode = root.findtext(".//RecurringDataCode");
        result.referenceNumber = root.findtext(".//RefNbr");
        result.transactionDescriptor = root.findtext(".//TxnDescriptor");
        result.cardBrandTransactionId = root.findtext(".//CardBrandTxnId");
        if (builder.paymentMethod) {
            result.transactionReference = new __1.TransactionReference(root.findtext(".//GatewayTxnId"));
            result.transactionReference.paymentMethodType =
                builder.paymentMethod.paymentMethodType;
        }
        if (root.findtext(".//AuthCode")) {
            result.transactionReference =
                result.transactionReference || new __1.TransactionReference();
            result.transactionReference.authCode = root.findtext(".//AuthCode");
        }
        if (root.find(".//TokenData") &&
            root.find(".//TokenData").findtext(".//TokenValue")) {
            var tokenData = root.find(".//TokenData");
            result.token = tokenData.findtext(".//TokenValue");
        }
        if (root.find(".//CardData")) {
            var cardData = root.find(".//CardData");
            result.giftCard = new __1.GiftCard();
            result.giftCard.number = cardData.findtext(".//CardNbr");
            result.giftCard.alias = cardData.findtext(".//Alias");
            result.giftCard.pin = cardData.findtext(".//PIN");
        }
        if (root.find(".//BatchId")) {
            result.batchId = root.findtext(".//BatchId");
            result.batchSeqNbr = root.findtext(".//BatchSeqNbr");
        }
        return result;
    };
    PorticoConnector.prototype.mapReportResponse = function (rawResponse, builder) {
        // todo: handle non-200 responses
        var posResponse = elementtree_1.XML(rawResponse).find(".//PosResponse");
        var doc = posResponse.find(".//" + this.mapReportRequestType(builder));
        var result;
        if (builder.reportType === __1.ReportType.Activity) {
            result = doc
                .findall(".//Details")
                .map(this.hydrateTransactionSummary.bind(this));
        }
        if (builder.reportType === __1.ReportType.FindTransactions) {
            result = doc
                .findall(".//Transactions")
                .map(this.hydrateTransactionSummary.bind(this));
        }
        else if (builder.reportType === __1.ReportType.TransactionDetail) {
            result = this.hydrateTransactionSummary(doc);
        }
        return result;
    };
    PorticoConnector.prototype.normalizeResponse = function (input) {
        if (["0", "85"].indexOf(input) !== -1) {
            input = "00";
        }
        return input;
    };
    PorticoConnector.prototype.hasToken = function (paymentMethod) {
        var tokenizable = paymentMethod;
        if (tokenizable.token) {
            return {
                hasToken: true,
                tokenValue: tokenizable.token,
            };
        }
        return {
            hasToken: false,
            tokenValue: "",
        };
    };
    PorticoConnector.prototype.hydrateAccountType = function (type) {
        switch (type) {
            case __1.AccountType.Checking:
                return "CHECKING";
            case __1.AccountType.Savings:
                return "SAVINGS";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateCheckType = function (type) {
        switch (type) {
            case __1.CheckType.Business:
                return "BUSINESS";
            case __1.CheckType.Payroll:
                return "PAYROLL";
            case __1.CheckType.Personal:
                return "PERSONAL";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateCredentialOnFile = function (builder) {
        var cof = new elementtree_1.Element("CardOnFileData");
        if (builder.transactionInitiator) {
            elementtree_1.SubElement(cof, "CardOnFile").append(elementtree_1.CData(builder.transactionInitiator));
        }
        if (builder.cardBrandTransactionId) {
            elementtree_1.SubElement(cof, "CardBrandTxnId").append(elementtree_1.CData(builder.cardBrandTransactionId));
        }
        return cof;
    };
    PorticoConnector.prototype.hydrateEncryptionData = function (builder) {
        var enc = new elementtree_1.Element("EncryptionData");
        var data = builder.paymentMethod
            .encryptionData;
        if (data.version) {
            elementtree_1.SubElement(enc, "Version").append(elementtree_1.CData(data.version));
        }
        if (data.trackNumber) {
            elementtree_1.SubElement(enc, "TrackNumber").append(elementtree_1.CData(data.trackNumber));
        }
        if (data.ktb) {
            elementtree_1.SubElement(enc, "KTB").append(elementtree_1.CData(data.ktb));
        }
        if (data.ksn) {
            elementtree_1.SubElement(enc, "KSN").append(elementtree_1.CData(data.ksn));
        }
        return enc;
    };
    PorticoConnector.prototype.hydrateEntryMethod = function (method) {
        switch (method) {
            case __1.EntryMethod.Manual:
                return "Manual";
            case __1.EntryMethod.Proximity:
                return "Proximity";
            case __1.EntryMethod.Swipe:
                return "Swipe";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateHolder = function (builder, isCheck) {
        var holder = new elementtree_1.Element(isCheck ? "ConsumerInfo" : "CardHolderData");
        elementtree_1.SubElement(holder, isCheck ? "Address1" : "CardHolderAddr").append(elementtree_1.CData(builder.billingAddress.streetAddress1));
        elementtree_1.SubElement(holder, isCheck ? "City" : "CardHolderCity").append(elementtree_1.CData(builder.billingAddress.city));
        elementtree_1.SubElement(holder, isCheck ? "State" : "CardHolderState").append(elementtree_1.CData(builder.billingAddress.province));
        elementtree_1.SubElement(holder, isCheck ? "Zip" : "CardHolderZip").append(elementtree_1.CData(builder.billingAddress.postalCode));
        if (isCheck) {
            var check = builder.paymentMethod;
            if (check.checkName) {
                var names = check.checkName.split(" ", 2);
                elementtree_1.SubElement(holder, "FirstName").append(elementtree_1.CData(names[0]));
                if (names[1]) {
                    elementtree_1.SubElement(holder, "LastName").append(elementtree_1.CData(names[1]));
                }
                elementtree_1.SubElement(holder, "CheckName").append(elementtree_1.CData(check.checkName));
            }
            if (check.phoneNumber) {
                elementtree_1.SubElement(holder, "PhoneNumber").append(elementtree_1.CData(check.phoneNumber));
            }
            if (check.driversLicenseNumber) {
                elementtree_1.SubElement(holder, "DLNumber").append(elementtree_1.CData(check.driversLicenseNumber));
            }
            if (check.driversLicenseState) {
                elementtree_1.SubElement(holder, "DLState").append(elementtree_1.CData(check.driversLicenseState));
            }
            if (check.ssnLast4 || check.birthYear) {
                var identity = elementtree_1.SubElement(holder, "IdentityInfo");
                elementtree_1.SubElement(identity, "SSNL4").append(elementtree_1.CData(check.ssnLast4));
                elementtree_1.SubElement(identity, "DOBYear").append(elementtree_1.CData(check.birthYear));
            }
        }
        return holder;
    };
    PorticoConnector.prototype.hydrateInquiryType = function (type) {
        switch (type) {
            case __1.InquiryType.Cash:
                return "CASH";
            case __1.InquiryType.Foodstamp:
                return "FOODSTAMP";
            case __1.InquiryType.Points:
                return "POINTS";
            case __1.InquiryType.Standard:
                return "STANDARD";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateManualEntry = function (block1, builder, hasToken, tokenValue) {
        var me = new elementtree_1.Element(hasToken ? "TokenData" : "ManualEntry");
        var card;
        if (builder.paymentMethod instanceof __1.CreditCardData) {
            card = builder.paymentMethod;
        }
        else {
            card = builder.paymentMethod;
        }
        if (builder.cardBrandTransactionId || builder.transactionInitiator) {
            block1.append(this.hydrateCredentialOnFile(builder));
        }
        if (card.number || hasToken) {
            elementtree_1.SubElement(me, hasToken ? "TokenValue" : "CardNbr").append(elementtree_1.CData(hasToken ? tokenValue : card.number));
        }
        if (card.expMonth) {
            elementtree_1.SubElement(me, "ExpMonth").append(elementtree_1.CData(card.expMonth));
        }
        if (card.expYear) {
            elementtree_1.SubElement(me, "ExpYear").append(elementtree_1.CData(card.expYear));
        }
        if (card.cvn) {
            elementtree_1.SubElement(me, "CVV2").append(elementtree_1.CData(card.cvn));
        }
        elementtree_1.SubElement(me, "ReaderPresent").append(elementtree_1.CData(card.readerPresent ? "Y" : "N"));
        elementtree_1.SubElement(me, "CardPresent").append(elementtree_1.CData(card.cardPresent ? "Y" : "N"));
        if (builder.transactionModifier === __1.TransactionModifier.Recurring) {
            var recurring = elementtree_1.SubElement(block1, "RecurringData");
            elementtree_1.SubElement(recurring, "ScheduleID").append(elementtree_1.CData(builder.scheduleId));
            elementtree_1.SubElement(recurring, "OneTime").append(elementtree_1.CData(builder.oneTimePayment ? "Y" : "N"));
        }
        return me;
    };
    PorticoConnector.prototype.hydrateSecCode = function (code) {
        switch (code) {
            case __1.SecCode.CCD:
                return "CCD";
            case __1.SecCode.PPD:
                return "PPD";
            case __1.SecCode.POP:
                return "POP";
            case __1.SecCode.WEB:
                return "WEB";
            case __1.SecCode.TEL:
                return "TEL";
            case __1.SecCode.EBronze:
                return "EBRONZE";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateTaxType = function (type) {
        switch (type) {
            case __1.TaxType.NotUsed:
                return "NOTUSED";
            case __1.TaxType.SalesTax:
                return "SALESTAX";
            case __1.TaxType.TaxExempt:
                return "TAXEXEMPT";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateTrackData = function (builder, hasToken, tokenValue) {
        var trackData = new elementtree_1.Element(hasToken ? "TokenValue" : "TrackData");
        if (hasToken) {
            elementtree_1.SubElement(trackData, "TokenValue").append(elementtree_1.CData(tokenValue));
            return trackData;
        }
        var track;
        if (builder.paymentMethod instanceof __1.CreditTrackData) {
            track = builder.paymentMethod;
        }
        else if (builder.paymentMethod instanceof __1.DebitTrackData) {
            track = builder.paymentMethod;
        }
        else {
            track = builder.paymentMethod;
        }
        trackData.append(elementtree_1.CData(track.value));
        if (track.paymentMethodType !== __1.PaymentMethodType.Debit) {
            trackData.set("method", track.entryMethod === __1.EntryMethod.Swipe ? "swipe" : "proximity");
        }
        return trackData;
    };
    PorticoConnector.prototype.hydrateTransactionSummary = function (root) {
        var result = new __1.TransactionSummary();
        result.accountDataSource = root.findtext(".//AcctDataSrc");
        result.amount = root.findtext(".//Amt");
        result.authorizedAmount = root.findtext(".//AuthAmt");
        result.authCode = root.findtext(".//AuthCode");
        result.batchCloseDate = new Date(root.findtext(".//BatchCloseDT"));
        result.batchSequenceNumber = root.findtext(".//BatchSeqNbr");
        result.cardSwiped = root.findtext(".//CardSwiped");
        result.cardType = root.findtext(".//CardType");
        result.clerkId = root.findtext(".//ClerkID");
        result.clientTransactionId = root.findtext(".//ClientTxnId");
        result.convenienceAmt = root.findtext(".//ConvenienceAmtInfo");
        result.deviceId = root.findtext(".//DeviceId");
        result.gratuityAmount = root.findtext(".//GratuityAmtInfo");
        result.issuerResponseCode = this.normalizeResponse(root.findtext(".//IssuerRspCode"));
        result.issuerResponseMessage = root.findtext(".//IssuerRspText");
        result.issuerTransactionId = root.findtext(".//IssTxnId");
        result.maskedCardNumber = root.findtext(".//MaskedCardNbr");
        result.gatewayResponseCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
        result.gatewayResponseMessage = root.findtext(".//GatewayRspMsg");
        result.originalTransactionId = root.findtext(".//OriginalGatewayTxnId");
        result.paymentType = root.findtext(".//PaymentType");
        result.poNumber = root.findtext(".//CardHolderPONbr");
        result.referenceNumber = root.findtext(".//RefNbr");
        result.responseDate = new Date(root.findtext(".//RspDT"));
        result.serviceName = root.findtext(".//ServiceName");
        result.settlementAmount = root.findtext(".//SettlementAmt");
        result.shippingAmt = root.findtext(".//ShippingAmtInfo");
        result.siteTrace = root.findtext(".//SiteTrace");
        result.status = root.findtext(".//TxnStatus");
        result.taxAmount = root.findtext(".//TaxAmtInfo");
        result.taxType = root.findtext(".//TaxType");
        result.transactionDate = new Date(root.findtext(".//TxnUtcDT"));
        result.transactionId = root.findtext(".//GatewayTxnId");
        result.username = root.findtext(".//UserName");
        result.description = root.findtext(".//Description");
        result.invoiceNumber = root.findtext(".//InvoiceNbr");
        result.customerId = root.findtext(".//CustomerID");
        result.uniqueDeviceId = root.findtext(".//UniqueDeviceId");
        result.transactionDescriptor = root.findtext(".//TxnDescriptor");
        result.giftCurrency = root.findtext(".//GiftCurrency");
        result.maskedAlias = root.findtext(".//GiftMaskedAlias");
        result.paymentMethodKey = root.findtext(".//PaymentMethodKey");
        result.scheduleId = root.findtext(".//ScheduleID");
        result.oneTimePayment = root.findtext(".//OneTime");
        result.recurringDataCode = root.findtext(".//RecurringDataCode");
        result.surchargeAmount = root.findtext(".//SurchargeAmtInfo");
        result.fraudRuleInfo = root.findtext(".//FraudInfoRule");
        result.repeatCount = root.findtext(".//RepeatCount");
        result.emvChipCondition = root.findtext(".//EMVChipCondition");
        result.hasEmvTags = root.findtext(".//HasEMVTag");
        result.hasEcomPaymentData = root.findtext(".//HasEComPaymentData");
        result.cavvResponseCode = root.findtext(".//CAVVResultCode");
        result.tokenPanLastFour = root.findtext(".//TokenPANLast4");
        result.companyName = root.findtext(".//Company");
        result.customerFirstName = root.findtext(".//CustomerFirstname");
        result.customerLastName = root.findtext(".//CustomerLastname");
        result.debtRepaymentIndicator = root.findtext(".//DebtRepaymentIndicator");
        result.captureAmount = root.findtext(".//CaptureAmtInfo");
        result.fullyCaptured = root.findtext(".//FullyCapturedInd");
        return result;
    };
    PorticoConnector.prototype.shouldIncludeCredentialOnFile = function (builder) {
        if ([
            __1.TransactionType.Auth,
            __1.TransactionType.Refund,
            __1.TransactionType.Sale,
            __1.TransactionType.Verify,
        ].indexOf(builder.transactionType) !== -1) {
            return true;
        }
        return false;
    };
    PorticoConnector.prototype.isAppleOrGooglePay = function (paymentDataSource) {
        return paymentDataSource == __1.PaymentDataSourceType.APPLEPAY
            || paymentDataSource == __1.PaymentDataSourceType.APPLEPAYAPP
            || paymentDataSource == __1.PaymentDataSourceType.APPLEPAYWEB
            || paymentDataSource == __1.PaymentDataSourceType.GOOGLEPAYAPP
            || paymentDataSource == __1.PaymentDataSourceType.GOOGLEPAYWEB;
    };
    PorticoConnector.XmlNamespace = "http://Hps.Exchange.PosGateway";
    return PorticoConnector;
}(XmlGateway_1.XmlGateway));
exports.PorticoConnector = PorticoConnector;
