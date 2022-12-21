import { Observable } from "rxjs";

export interface Field {
    type: string;
    addEventListener: Function
    blur: Function;
    cardHolderNameFocused: Function;
    clear: Function;
    createInstallmentsPlan: Function;
    // createPinToken: Function;
    createToken: Function;
    destroy: Function;
    focus: Function;
    getBinInformation: Function;
    mount: Function;
    on: Function;
    unmount: Function;
    update: Function;
    updateCardHolder: Function;
    onChange: Observable<any>;
    onBrand: Observable<any>;
    onError: Observable<any>;
    onFocus: Observable<any>;
    onBlur: Observable<any>;
    onComplete: Observable<any>;
}
