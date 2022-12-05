import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MethodsComponent } from './component/methods/methods.component';
import { PaymentFormComponent } from './component/payment-form/payment-form.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormCardInfoComponent } from './component/form-card-info/form-card-info.component';
import { FormGenerateOrderComponent } from './component/form-generate-order/form-generate-order.component';
import { OrderResultComponent } from './component/order-result/order-result.component';
import { SmallFieldsComponent } from './component/small-fields/small-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
    PaymentFormComponent,
    DashboardComponent,
    FormCardInfoComponent,
    FormGenerateOrderComponent,
    OrderResultComponent,
    SmallFieldsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
