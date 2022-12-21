import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MethodsFilter } from 'src/app/model/MethodsFilter';
import { PayCardToken, PaymentCardInfo, PaymentDto } from 'src/app/model/PaymentDto';
//
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private orderPayment: Subject<PaymentDto> = new Subject<PaymentDto>();
    private orderBehavior: BehaviorSubject<PaymentDto> = new BehaviorSubject<PaymentDto>({} as PaymentDto);

    constructor(
        private http: HttpClient,
        @Inject('METHODS') private methodsUrl: string,
        @Inject('CARD_INFO') private cardInfoUrl: string,
        @Inject('ORDER_URL') private orderUrl: string,
        @Inject('CARD_TOKEN_URL') private cardTokenUrl:string
    ) { }

    get order() {
        return this.orderBehavior.getValue();
    }

    set order(newOrder: any) {
        this.orderBehavior.next(newOrder);      
    }

    sendCardInfo(order: PaymentCardInfo) {
        return this.http.post(this.cardInfoUrl, order)
    }

    getMethods(filters?: MethodsFilter): Observable<any> {
        return this.http.get(this.methodsUrl, { params: { ...filters}}); 
    }

    getOrder(id: string, detail?: boolean) {
        return detail 
            ? this.http.get(`${this.orderUrl}-details`, { params: {id} } )
            : this.http.get(this.orderUrl, { params: {id} });
    }

    paySmallFields(order: PayCardToken) {
        return this.http.post(this.cardTokenUrl, order);
    }
}
