import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';
import { LineChartComponent } from 'src/app/charts/line-chart/line-chart.component';


@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    LineChartComponent,
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
