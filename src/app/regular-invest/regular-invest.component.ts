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
  selector: 'app-regular-invest',
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
  templateUrl: './regular-invest.component.html',
  styleUrl: './regular-invest.component.scss',
})
export class RegularInvestComponent {
  fb = inject(FormBuilder);
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#C7B42C', '#A10A28'], // Pessimist (red), Expected (green), Investment (default)
  };

  chartData = [
    {
      name: 'Investment',
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
      name: 'Expected Return',
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
    {
      name: 'Pessimist Return',
      series: [
        {
          name: '0',
          value: 0,
        },
        {
          name: '50',
          value: 1800,
        },
        {
          name: '100',
          value: 6000,
        },
        {
          name: '150',
          value: 10500,
        },
      ],
    },
  ];

  investForm = new FormGroup({
    monthlyInvestment: new FormControl(50),
    years: new FormControl(15),
    expectedReturn: new FormControl(8.0),
    pessimistReturn: new FormControl(5.0),
    startingValue: new FormControl(1000),
  });

  yearsArray: number[] = Array.from({ length: 30 }, (v, k) => k + 1);

  totalInvested: number = 0;
  finalValue: number = 0;
  finalPessimistValue: number = 0;

  ngOnInit() {
    this.calculateInvestment();
  }

  calculateInvestment() {
    const startingValue = this.investForm.value.startingValue || 0;
    const monthlyInvestment = this.investForm.value.monthlyInvestment || 0;
    const years = this.investForm.value.years || 0;
    const expectedReturn = this.investForm.value.expectedReturn || 0;
    const pessimistReturn = this.investForm.value.pessimistReturn || 0;

    const months = years * 12;
    const expectedMonthlyRate = expectedReturn / 100 / 12;
    const pessimistMonthlyRate = pessimistReturn / 100 / 12;

    this.totalInvested = startingValue + monthlyInvestment * months;

    this.finalValue =
      startingValue * Math.pow(1 + expectedMonthlyRate, months) +
      monthlyInvestment *
        ((Math.pow(1 + expectedMonthlyRate, months) - 1) /
          expectedMonthlyRate) *
        (1 + expectedMonthlyRate);

    this.finalPessimistValue =
      startingValue * Math.pow(1 + pessimistMonthlyRate, months) +
      monthlyInvestment *
        ((Math.pow(1 + pessimistMonthlyRate, months) - 1) /
          pessimistMonthlyRate) *
        (1 + pessimistMonthlyRate);

    // Update the chart data based on the selected number of years
    this.chartData = [
      {
        name: 'Investment',
        series: Array.from({ length: years }, (_, i) => {
          const year = i + 1;
          const month = year * 12;
          const value = startingValue + monthlyInvestment * month;
          return { name: year.toString(), value: value };
        }),
      },
      {
        name: 'Expected Return',
        series: Array.from({ length: years }, (_, i) => {
          const year = i + 1;
          const month = year * 12;
          const value =
            startingValue * Math.pow(1 + expectedMonthlyRate, month) +
            monthlyInvestment *
              ((Math.pow(1 + expectedMonthlyRate, month) - 1) /
                expectedMonthlyRate) *
              (1 + expectedMonthlyRate);
          return { name: year.toString(), value: value };
        }),
      },
      {
        name: 'Pessimist Return',
        series: Array.from({ length: years }, (_, i) => {
          const year = i + 1;
          const month = year * 12;
          const value =
            startingValue * Math.pow(1 + pessimistMonthlyRate, month) +
            monthlyInvestment *
              ((Math.pow(1 + pessimistMonthlyRate, month) - 1) /
                pessimistMonthlyRate) *
              (1 + pessimistMonthlyRate);
          return { name: year.toString(), value: value };
        }),
      },
    ];
  }
}
