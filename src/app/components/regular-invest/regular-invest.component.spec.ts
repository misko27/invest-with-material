import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegularInvestComponent } from './regular-invest.component';

describe('RegularInvestComponent', () => {
  let component: RegularInvestComponent;
  let fixture: ComponentFixture<RegularInvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularInvestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegularInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
