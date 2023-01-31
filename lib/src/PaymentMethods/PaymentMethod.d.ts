import { IPaymentMethod, PaymentMethodType } from "../";
export declare abstract class PaymentMethod implements IPaymentMethod {
    paymentMethodType: PaymentMethodType;
    [key: string]: any;
    get isAuthable(): boolean;
    get isBalanceable(): boolean;
    get isCardData(): boolean;
    get isChargable(): boolean;
    get isEditable(): boolean;
    get isEncryptable(): boolean;
    get isPinProtected(): boolean;
    get isPrePayable(): boolean;
    get isRefundable(): boolean;
    get isReversable(): boolean;
    get isTokenizable(): boolean;
    get isTrackData(): boolean;
    get isVerifyable(): boolean;
    get isVoidable(): boolean;
}
