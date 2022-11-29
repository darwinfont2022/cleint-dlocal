import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Method } from '../model/Methods';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {

  private subscriptions: Subscription;
  constructor(private httpClient: HttpClient, @Inject('METHODS') private methodsUrl: string) {
    this.subscriptions = new Subscription();
  }

  getMethods(): Observable<any> {
    return this.httpClient.get(this.methodsUrl); 
  }
}
