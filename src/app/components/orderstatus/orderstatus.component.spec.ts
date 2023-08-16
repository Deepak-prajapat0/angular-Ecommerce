import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderstatusComponent } from './orderstatus.component';

describe('OrderstatusComponent', () => {
  let component: OrderstatusComponent;
  let fixture: ComponentFixture<OrderstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderstatusComponent]
    });
    fixture = TestBed.createComponent(OrderstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
