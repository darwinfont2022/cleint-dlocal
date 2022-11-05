import { Component, OnInit } from '@angular/core';
import { DLocal2Service } from './component/service/dlocal2.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'small-fields';

  cardHolderName: string = "";

  constructor(public dlocal: DLocal2Service) {
  }

  ngOnInit(): void {
    console.log('Div card',this.dlocal.getCardElement());
    this.dlocal.mount();
  }

  pay(){
    this.dlocal.generateToken(this.cardHolderName)
  }
}
