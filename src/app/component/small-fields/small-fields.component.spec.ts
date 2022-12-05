import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallFieldsComponent } from './small-fields.component';

describe('SmallFieldsComponent', () => {
  let component: SmallFieldsComponent;
  let fixture: ComponentFixture<SmallFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
