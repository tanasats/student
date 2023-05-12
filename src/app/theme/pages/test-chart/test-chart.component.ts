import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.scss']
})
export class TestChartComponent {
  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
          startAngle: 0,
          suggestedMax: 4,
          suggestedMin: 0,
          max: 4,
          min: 0,
          // ticks: {
          //     stepSize: 0.5,
          //     maxTicksLimit: 3,
          //     display: false
          // },
          pointLabels: {
              font: {
                  family: 'Sarabun',
                  weight: 'normal',
                  size: 11
              },
              // color: 'black'
          },
          // angleLines: {
          //     lineWidth: 2,
          //     display: true
          // },
      },            
  },
  };

  //public radarChartLabels: string[] = [ 'ควาถูกต้องและสมบูรณ์', 'ตรงตามความต้องการ', 'ความสอดคล้องกัน', 'ความเป็นปัจจุบัน', 'ความพร้อมใช้'];
  public radarChartLabels: string[] = [ 'ควาถูกต้องและสมบูรณ์', 'ตรงตามความต้องการ', 'ความสอดคล้องกัน', 'ความเป็นปัจจุบัน', 'ความพร้อมใช้'];


  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [ 2, 1, 3, 3.5, 2.5], label:'ก่อนปรับปรัง'},
      { data: [ 3, 4, 3.5,4 ,3], label:'หลังปรับปรุง 2'}
    ]
  };
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  constructor() { }

  ngOnInit() {
  }
}
