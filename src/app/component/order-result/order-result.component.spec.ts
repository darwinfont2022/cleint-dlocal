import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResultComponent } from './order-result.component';

xdescribe('OrderResultComponent', () => {
  let component: OrderResultComponent;
  let fixture: ComponentFixture<OrderResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
