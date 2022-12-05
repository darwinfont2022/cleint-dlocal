import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderPaid } from 'src/app/model/OrderPaid';
import { ApiService } from 'src/app/service/api-service/api.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit {

  order: OrderPaid = {
    order_id: '',
    amount: 0,
    currency: '',
    status: '',
    status_code: 0,
    status_detail: '',
    country: '',
  };
  constructor(
    private router: ActivatedRoute,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.router.params.subscribe((res: any) => {
      this.apiService.getOrder(res.order_id, true).subscribe((res: any) => {
        console.log(res);
        this.order = res;
        this.order.created_date = new Date(res.created_date);
      })
    });
  }
}
