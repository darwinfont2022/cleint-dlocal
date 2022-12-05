import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormGenerateOrderComponent } from './component/form-generate-order/form-generate-order.component';
import { MethodsComponent } from './component/methods/methods.component';
import { OrderResultComponent } from './component/order-result/order-result.component';
import { FormCardInfoComponent } from './component/form-card-info/form-card-info.component'
import { SmallFieldsComponent } from './component/small-fields/small-fields.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  //   children: [
  //     
  //     // { path: 'generate-order', component: FormGenerateOrderComponent},
  //     { path: 'payment', component: PaymentFormComponent}
  //   ] 
  // },
  { path: 'methods', component: MethodsComponent},
  { path: 'card-info', component: FormCardInfoComponent},
  { path: 'samll-fields', component: SmallFieldsComponent},
  { path: 'generate-order', component: FormGenerateOrderComponent},
  { path: 'order-result/:order_id', component: OrderResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
