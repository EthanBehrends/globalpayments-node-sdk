import { Element } from "@azz/elementtree";
import { AccountType, AuthorizationBuilder, CheckType, EntryMethod, InquiryType, IPaymentGateway, IPaymentMethod, ManagementBuilder, ReportBuilder, SecCode, TaxType, Transaction, TransactionBuilder, TransactionSummary } from "../";
import { XmlGateway } from "./XmlGateway";
export declare class PorticoConnector extends XmlGateway implements IPaymentGateway {
    protected static XmlNamespace: string;
    siteId: string;
    licenseId: string;
    deviceId: string;
    username: string;
    password: string;
    secretApiKey: string;
    developerId: string;
    versionNumber: string;
    sdkNameVersion: string;
    supportsHostedPayments: boolean;
    processAuthorization(builder: AuthorizationBuilder): Promise<Transaction>;
    serializeRequest(_builder: AuthorizationBuilder): string;
    manageTransaction(builder: ManagementBuilder): Promise<Transaction>;
    processReport<T>(builder: ReportBuilder<T>): Promise<T>;
    protected buildEnvelope(transaction: Element, clientTransactionId?: string): string;
    protected mapRequestType(builder: TransactionBuilder<Transaction>): string;
    protected mapReportRequestType<T>(builder: ReportBuilder<T>): string;
    protected mapResponse(rawResponse: string, builder: TransactionBuilder<Transaction>): Transaction;
    protected mapReportResponse<T>(rawResponse: string, builder: ReportBuilder<T>): T;
    protected normalizeResponse(input: string): string;
    protected hasToken(paymentMethod: IPaymentMethod): {
        hasToken: boolean;
        tokenValue: string;
    };
    protected hydrateAccountType(type: AccountType): "" | "CHECKING" | "SAVINGS";
    protected hydrateCheckType(type: CheckType): "" | "BUSINESS" | "PAYROLL" | "PERSONAL";
    protected hydrateCredentialOnFile(builder: AuthorizationBuilder): Element;
    protected hydrateEncryptionData(builder: TransactionBuilder<Transaction>): Element;
    protected hydrateEntryMethod(method: EntryMethod): "" | "Manual" | "Proximity" | "Swipe";
    protected hydrateHolder(builder: AuthorizationBuilder, isCheck: boolean): Element;
    protected hydrateInquiryType(type: InquiryType): "" | "CASH" | "FOODSTAMP" | "POINTS" | "STANDARD";
    protected hydrateManualEntry(block1: Element, builder: AuthorizationBuilder, hasToken: boolean, tokenValue: string): Element;
    protected hydrateSecCode(code: SecCode): "" | "CCD" | "PPD" | "POP" | "WEB" | "TEL" | "EBRONZE";
    protected hydrateTaxType(type: TaxType): "" | "NOTUSED" | "SALESTAX" | "TAXEXEMPT";
    protected hydrateTrackData(builder: TransactionBuilder<Transaction>, hasToken: boolean, tokenValue: string): Element;
    protected hydrateTransactionSummary(root: Element): TransactionSummary;
    protected shouldIncludeCredentialOnFile(builder: TransactionBuilder<Transaction>): boolean;
    protected isAppleOrGooglePay(paymentDataSource: string): boolean;
}
