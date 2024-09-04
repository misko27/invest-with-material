import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-investment-property',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './investment-property.component.html',
  styleUrl: './investment-property.component.scss',
})
export class InvestmentPropertyComponent {
  fb = inject(FormBuilder);

  propertyForm = new FormGroup({
    propertyPrice: new FormControl(80000), // Property Price
    monthlyIncome: new FormControl(500), // Monthly Rental Income
    monthlyExpenses: new FormControl(250), // Monthly Expenses
  });

  netAnnualReturn: number = 0; // To store the calculated net annual return

  ngOnInit() {
    this.calculatePropertyInvestment();
  }

  calculatePropertyInvestment() {
    const propertyPrice = this.propertyForm.value.propertyPrice || 0;
    const monthlyIncome = this.propertyForm.value.monthlyIncome || 0;
    const monthlyExpenses = this.propertyForm.value.monthlyExpenses || 0;

    const annualIncome = monthlyIncome * 12; // Convert monthly income to annual income
    const annualExpenses = monthlyExpenses * 12; // Convert monthly expenses to annual expenses

    // Calculate the net annual return based on the provided formula
    this.netAnnualReturn =
      ((annualIncome - annualExpenses) / propertyPrice) * 100;
  }
}
