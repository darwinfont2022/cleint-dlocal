import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Method } from 'src/app/model/Methods';
import { PaymentCardInfo } from 'src/app/model/PaymentDto';
import { ApiService } from 'src/app/service/api-service/api.service';
import { MethodsComponent } from '../methods/methods.component';

@Component({
  selector: 'app-form-generate-order',
  templateUrl: './form-generate-order.component.html',
  styleUrls: ['./form-generate-order.component.scss']
})
export class FormGenerateOrderComponent implements OnInit, OnDestroy{

  usuarioId: string;
  order: PaymentCardInfo;
  type: string = '';
  private subscriptions: Subscription;

  orderForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRouter: ActivatedRoute,
    ) {
      this.usuarioId = this.getUuid();
      this.subscriptions = new Subscription();

      this.orderForm = this.generateFormGroup();

      this.order = this.initOrder();  
    }

  getRandom(min: number,max: number){
    return Math.floor(Math.random() * ( 1 + max - min)) + min;
  }

  getUuid() {
    let url = URL.createObjectURL(new Blob([])).split('/');
    return  url[url.length - 1];
  }

  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe((params) => {
      this.type = params.get('type') || '';
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    switch(this.type) {
        case 'cardInfo': {
            this.payCarInfo();
            return;
        }
        case 'smallField' : {
            this.paySmallFields();
            return;
        }
        default: {
            console.log('Error type of payment undefined')
        }
    }
  }

  getMethodsTypeSelect(typeToSearch: string = "") {
    const method: any = this.modalService.open(MethodsComponent, {
        centered: true,
        backdrop: 'static'
    });
    method.componentInstance.typeToSearch = typeToSearch;
    return method.result.then((res: any) => res);
  }

  async paySmallFields() {
    const method = await this.getMethodsTypeSelect();
    console.log(method);
    this.router.navigate(['/samll-fields']);
  }

  async payCarInfo(){
      const {id} = await this.getMethodsTypeSelect("CARD");
      
      this.order = { ...this.order,
        ...this.orderForm.value,
        method_id: id
      };
      this.order.country = this.parseCountry(this.order.country);

      this.router.navigateByUrl('/card-info', { state: this.order});
  }

  parseCountry(value: string){
    switch (value) {
      case 'Brasil': return 'BR';
      case 'Mexico': return 'MX';
      default: return 'UY';
    }
  }

  generateFormGroup(): FormGroup {
    return new FormGroup({
      amount: new FormControl('0', [Validators.required, Validators.min(1), Validators.nullValidator,]),
      currency: new FormControl('UYU', [Validators.required]),
      country: new FormControl('Uruguay', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      document: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

  initOrder(){
      return {
      order_id: `${this.getRandom(1, 1000)}`,
      amount: 0,
      currency: '',
      country: '',
      document: '',
      method_id: '',
      holder_name: '',
      number: '',
      cvv: '',
      expiration_month: '',
      expiration_year: '',
      email: ''
    }
  }
}
