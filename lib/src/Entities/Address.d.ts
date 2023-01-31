import { AddressType } from "../Entities";
export declare class Address {
    type: AddressType;
    streetAddress1: string;
    streetAddress2: string;
    streetAddress3: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    get state(): string;
    set state(value: string);
}
