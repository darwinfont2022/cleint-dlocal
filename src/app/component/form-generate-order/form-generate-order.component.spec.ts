import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenerateOrderComponent } from './form-generate-order.component';

xdescribe('FormGenerateOrderComponent', () => {
  let component: FormGenerateOrderComponent;
  let fixture: ComponentFixture<FormGenerateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGenerateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGenerateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
