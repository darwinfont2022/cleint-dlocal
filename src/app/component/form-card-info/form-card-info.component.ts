import { Component, OnInit, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentCardInfo } from '../../model/PaymentDto';
import { ApiService } from '../../service/api-service/api.service';

@Component({
  selector: 'app-form-card-info',
  templateUrl: './form-card-info.component.html',
  styleUrls: ['./form-card-info.component.scss']
})
export class FormCardInfoComponent implements OnInit {

  @ViewChild('content', {static: true, read: TemplateRef}) content!: ElementRef;
  private order: PaymentCardInfo;
  form: FormGroup;
  modalRef: any = {};

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private apiService: ApiService,
  ){
    this.order = this.initOrder();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
    this.order = history.state;
    this.open(this.content);
  }

  pay(){
    this.modalRef.close();
    const exp = this.form.value.expiration.split('/');
    this.order.holder_name = this.form.value.holder_name;
    this.order.number = this.form.value.number;
    this.order.expiration_month = exp[0];
    this.order.expiration_year = exp[1];
    this.apiService.sendCardInfo(this.order).subscribe((response :any) => {
      this.router.navigate([`/order-result/${response.order_id}`]);
    }, error => {
        console.error(error);
    })
  }

  open(content: any){
    this.modalRef = this.modalService.open(content, {});
  }

  initOrder() {
      return {
      order_id: '',
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

  generateForm(): FormGroup {
    return new FormGroup({
      holder_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      number: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      expiration: new FormControl('', [Validators.required, Validators.minLength(7),]),
    });
  }
}
