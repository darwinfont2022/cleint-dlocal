import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Method } from 'src/app/model/Methods';
import { MethodsService } from 'src/app/service/methods.service';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit, OnDestroy {

  public methods: Method[];
  private subscription: Subscription
  constructor(private methodsService: MethodsService) {
    this.methods = [];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getMethods();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getMethods() {
    this.methodsService.getMethods().subscribe((response: Method[]) => {
      this.methods = response;
    })
  }
}
