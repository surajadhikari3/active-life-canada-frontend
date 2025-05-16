import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <div class="space-y-6">
      <!-- Info Header -->
      <div class="bg-white p-6 rounded-lg shadow flex justify-between items-center">
        <button class="bg-blue-600 text-white px-4 py-2 rounded shadow">➕ Add Family Member</button>
        <div class="space-x-4 text-sm">
          <span>👥 Family Group: 33</span>
          <span>💳 Credits: $230</span>
          <span>📤 Withdraws: 5</span>
          <span>📚 Courses: 2</span>
          <span class="text-green-600">💰 Cost: $510</span>
        </div>
      </div>

      <!-- Highcharts Bar -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Course vs Cost (Highcharts)</h2>
        <highcharts-chart
          [Highcharts]="Highcharts"
          [options]="chartOptions"
          style="width: 100%; height: 400px; display: block;"
        ></highcharts-chart>
      </div>
    </div>
  `
})
export class HomeDashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Family Member Course vs Cost'
    },
    xAxis: {
      categories: ['pp', 'submem', 'men2', 'dsfds'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: { text: 'Value' }
    },
    tooltip: {
      shared: true,
      useHTML: true
    },
    series: [
      {
        name: 'Courses Taken',
        type: 'column',
        data: [1, 0, 1, 0],
        color: '#6366f1'
      },
      {
        name: 'Total Cost ($)',
        type: 'column',
        data: [1150, 0, 500, 0],
        color: '#22c55e'
      }
    ]
  };
}
