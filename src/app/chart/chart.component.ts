import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [BaseChartDirective]
})
export class ChartComponent {

  pieChartData!: ChartData<ChartType, number[], string>;
  pieChartLabels: string[] = [];
  constructor(private http : HttpClient)   { }
  ngOnInit(): void {
  this.http.get<any>('http://localhost:8087/contrat/Count').subscribe(data => {
    console.log("this is data from BE :", data);
    this.pieChartLabels = Object.keys(data); 
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey'],
        },
      ],
    };
  });

  }


}
