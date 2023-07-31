import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellingComponent } from './bestSelling.component';

describe('BestsellingComponent', () => {
  let component: BestsellingComponent;
  let fixture: ComponentFixture<BestsellingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestsellingComponent]
    });
    fixture = TestBed.createComponent(BestsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
