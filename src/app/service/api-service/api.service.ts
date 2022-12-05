import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MethodsFilter } from 'src/app/model/MethodsFilter';
import { PaymentCardInfo } from 'src/app/model/PaymentDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject('METHODS') private methodsUrl: string,
    @Inject('CARD_INFO') private cardInfoUrl: string,
    @Inject('ORDER_URL') private orderUrl: string,
    ) { }

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

}
