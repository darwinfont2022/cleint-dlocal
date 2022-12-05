import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DLocalService } from './service/dlocal/dlocal2.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'small-fields';

  private subscriptions: Subscription;
  cardHolderName: string = "";

  public paymentMethod: any[];

  constructor(
    // public dlocal: DLocal2Service
    ) {
    this.subscriptions = new Subscription();
    this.paymentMethod = [];
  }

  ngOnInit(): void {
    // console.log('Div card',this.dlocal.getCardElement());
    // this.dlocal.mount();
    // this.getPaymentMethods();
  }

  pay(){
    // this.dlocal.generateToken(this.cardHolderName)
  }

  getPaymentMethods(){
    // this.subscriptions.add(this.dlocal.getMethods().subscribe((response: any) => {
    //   this.paymentMethod = response;
    //   console.log(this.paymentMethod);
    // }, error => {
    //   console.log(error);
    // }));
  }
}
