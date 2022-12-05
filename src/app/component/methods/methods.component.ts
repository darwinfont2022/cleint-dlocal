import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Method } from 'src/app/model/Methods';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit, OnDestroy {

  public methods: Method[];
  private subscription: Subscription;
  @Input()
  typeToSearch: string = "";
  @Output()
  public methodSelected: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, private router: Router,
    private modal: NgbActiveModal
    ) {
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
    this.apiService.getMethods({ country: 'UY', type: this.typeToSearch}).subscribe((response: Method[]) => {
      this.methods = response;
    }, error => {
      console.log(error);
    })
  }

  onSelect(methodSelected: Method): void {
    this.modal.close(methodSelected);
    this.methodSelected.emit(methodSelected);
  }
}
