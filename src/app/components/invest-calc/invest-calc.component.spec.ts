import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestCalcComponent } from './invest-calc.component';

describe('InvestCalcComponent', () => {
  let component: InvestCalcComponent;
  let fixture: ComponentFixture<InvestCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestCalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
