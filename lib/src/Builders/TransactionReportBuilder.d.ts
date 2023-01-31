import { ReportBuilder } from "./ReportBuilder";
import { IDictionary } from "./BaseBuilder";
export declare class TransactionReportBuilder<T> extends ReportBuilder<T> {
    deviceId: string;
    endDate: Date;
    startDate: Date;
    transactionId: string;
    searchCriteria: IDictionary<string>;
    setupValidations(): void;
    withDeviceId(deviceId?: string): this;
    withEndDate(endDate?: Date): this;
    withStartDate(startDate?: Date): this;
    withTransactionId(transactionId?: string): this;
    where(criteria: string, value: string): this;
}
