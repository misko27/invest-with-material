import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-invest-calc',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxChartsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './invest-calc.component.html',
  styleUrl: './invest-calc.component.scss',
})
export class InvestCalcComponent {
  fb = inject(FormBuilder);
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#A10A28', '#C7B42C', '#AAAAAA'],
  };

  chartData = [
    {
      name: 'Investícia',
      series: [
        {
          name: '0',
          value: 0,
        },
        {
          name: '50',
          value: 2000,
        },
        {
          name: '100',
          value: 5000,
        },
        {
          name: '150',
          value: 9000,
        },
      ],
    },
    {
      name: 'Očakávaný výnos',
      series: [
        {
          name: '0',
          value: 0,
        },
        {
          name: '50',
          value: 2500,
        },
        {
          name: '100',
          value: 7000,
        },
        {
          name: '150',
          value: 13295,
        },
      ],
    },
  ];

  investForm = new FormGroup({
    monthlyInvestment: new FormControl(50),
    years: new FormControl(15),
    expectedReturn: new FormControl(5.0),
  });

  yearsArray: number[] = Array.from({ length: 30 }, (v, k) => k + 1);

  totalInvested: number = 0;
  finalValue: number = 0;

  ngOnInit() {
    this.calculateInvestment();
  }

  calculateInvestment() {
    const monthlyInvestment = this.investForm.value.monthlyInvestment || 0;
    const years = this.investForm.value.years || 0; // Use selected years
    const expectedReturn = this.investForm.value.expectedReturn || 0;

    const months = years * 12;
    const monthlyRate = expectedReturn / 100 / 12;

    this.totalInvested = monthlyInvestment * months;

    this.finalValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    // Update the chart data based on the selected number of years
    this.chartData = [
      {
        name: 'Investícia',
        series: Array.from({ length: years }, (_, i) => {
          const year = i + 1;
          const month = year * 12;
          const value = monthlyInvestment * month;
          return { name: year.toString(), value: value };
        }),
      },
      {
        name: 'Očakávaný výnos',
        series: Array.from({ length: years }, (_, i) => {
          const year = i + 1;
          const month = year * 12;
          const value =
            monthlyInvestment *
            ((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate) *
            (1 + monthlyRate);
          return { name: year.toString(), value: value };
        }),
      },
    ];
  }
}
