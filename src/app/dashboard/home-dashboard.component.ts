import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { API_ENDPOINTS } from '../shared/constants';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <div class="space-y-6">
      <!-- Info Header -->
      <div class="bg-white p-6 rounded-lg shadow flex justify-between items-center">
<!--        <button class="bg-blue-600 text-white px-4 py-2 rounded shadow">➕ Add Family Member</button>-->
        <div class="space-x-4 text-sm" *ngIf="familyGroup">
          <span>👥 Family Group: {{ familyGroup.familyGroupId }}</span>
          <span>💳 Credits: <span>$</span>{{ familyGroup.credits }}</span>
          <span>📤 Withdraws: {{ familyGroup.totalWithdrawCourses }}</span>
          <span>📚 Courses: {{ familyGroup.totalCourseEnrolled }}</span>
          <span class="text-green-600">💰 Cost: <span>$</span> {{ familyGroup.totalCostOfEnrolledCourses }}</span>
        </div>
      </div>

      <!-- Highcharts -->
      <div class="bg-white p-6 rounded-lg shadow" *ngIf="chartReady">
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
export class HomeDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  chartReady = false;

  familyGroup: any = null;

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  ngOnInit(): void {
    const memberId = this.auth.user()?.memberLoginId || sessionStorage.getItem('memberLoginId');
    if (!memberId) {
      console.warn('⚠️ No memberId found in AuthService or sessionStorage');
      return;
    }

    this.http.get(`${API_ENDPOINTS.AUTHENTICATION_BASE_URL}/familyGroup/${memberId}`)
      .subscribe({
        next: (res: any) => {
          this.familyGroup = res;
          this.buildChart(res);
        },
        error: err => console.error('❌ Failed to fetch family group', err)
      });
  }

  buildChart(data: any) {
    const categories = data.familyMember.map((m: any) => m.name);
    const courseCounts = data.familyMember.map((m: any) => m.courseRegistrations?.length || 0);
    const totalCosts = data.familyMember.map((m: any) =>
      m.courseRegistrations?.reduce((sum: number, c: any) => sum + c.cost, 0) || 0
    );

    this.chartOptions = {
      chart: { type: 'column' },
      title: { text: 'Family Member Course vs Cost' },
      xAxis: { categories, crosshair: true },
      yAxis: { min: 0, title: { text: 'Value' } },
      tooltip: { shared: true, useHTML: true },
      series: [
        {
          name: 'Courses Taken',
          type: 'column',
          data: courseCounts,
          color: '#6366f1'
        },
        {
          name: 'Total Cost ($)',
          type: 'column',
          data: totalCosts,
          color: '#22c55e'
        }
      ]
    };

    this.chartReady = true;
  }
}
