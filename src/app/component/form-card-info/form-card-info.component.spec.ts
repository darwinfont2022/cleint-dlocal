import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardInfoComponent } from './form-card-info.component';

xdescribe('FormCardInfoComponent', () => {
  let component: FormCardInfoComponent;
  let fixture: ComponentFixture<FormCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCardInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
