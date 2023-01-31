import { IRecurringEntity, TransactionType } from "../";
import { TransactionBuilder } from "./TransactionBuilder";
import { IDictionary } from "./BaseBuilder";
export declare class RecurringBuilder<T extends IRecurringEntity> extends TransactionBuilder<T> {
    key: string;
    orderId: string;
    entity: IRecurringEntity | Function;
    searchCriteria: IDictionary<string>;
    constructor(type: TransactionType, entity?: IRecurringEntity | Function);
    addSearchCriteria(key: string, value: string): this;
    execute(): Promise<T>;
    setupValidations(): void;
}
