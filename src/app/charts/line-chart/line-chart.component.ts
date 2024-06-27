import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() chartData: any[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartType: string = 'bar';
  @Input() chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: false
      }],
      yAxes: [{
        stacked: false
      }],
      legend: {
        position: 'bottom', // This line sets the legend position to bottom
      }
    },

  };
  @Input() chartLegend: boolean = true;
  @Input() chartTitle: string = ''; // New input property for the chart title

  // @Input() chartData: any
   chart: any;

  ngOnInit() {
  //   this.chart = new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       labels: this.chartData.labels,
  //       datasets: [
  //         {
  //           label: this.chartData.label,
  //           data: this.chartData.data,
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
  }
}
