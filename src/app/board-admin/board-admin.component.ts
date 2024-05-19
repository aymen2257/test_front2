import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../_services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartOptions } from 'chart.js';
import { TokenStorageService } from '../_services/token-storage.service';
import { ITypePercentage } from '../interface/count.interface';
import { ContratService } from '../_services/contrat.service';
import { ProduitService } from '../_services/produit.service';




@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content !: string ;
  public chart: any;


  public typeData: Array<ITypePercentage> = [];

  data: any
  label: any
  tab: any
  users: any
  contrats: any
  produits: any

  constructor(private userService: UserService,private produitService: ProduitService, private contratService: ContratService) { }

  //doughnutChartData: any[] = [];
  //doughnutChartLabels : any[] = [];
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.contratService.getTypePercentage().subscribe(
      (d) => {
        // console.log(d);
        this.tab = d;
        console.log(this.tab.count);
        console.log(this.tab.branche);

        /* d.forEach((typeCount: ITypePercentage) => {
          console.log(typeCount.count);
          console.log(typeCount.branche);
          this.data=typeCount.count;
          this.label=typeCount.branche.libelleBranche;
          this.doughnutChartData.push(typeCount.count);
          this.doughnutChartLabels.push(typeCount.branche.libelleBranche);
        }); */
      },
      (error) => {
        console.error(error);
      }
    );

    this.contratService.getAllContrats().subscribe(
      (result) => {
        this.contrats = result.length;

      },
      (error) => {
        console.error(error);
      }
    )

    this.userService.getAllUsers().subscribe(
      (r) => {
        this.users = r.length;

      },
      (error) => {
        console.error(error);
      }

    )

    this.produitService.getAllProduits().subscribe(
      (r) => {
        this.produits = r.length;

      },
      (error) => {
        console.error(error);
      }
    )


    /*  this.createdoChart(this.doughnutChartLabels,this.doughnutChartData,'doughnut','dochart');
     this.createChart('mychart','line');*/
    //this.createChart('mychart', 'bar');

  }
  createChart(title: any, type: any) {

    this.chart = new Chart(title, {
      type: type, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  /* createdoChart(labeldata:any,maindata:any,type:any,title:any){

    this.chart = new Chart(title, {
      type: type, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labeldata,
	       datasets: [
          {
            label: "Sales",
            data: maindata,
            backgroundColor: ['#f68059', '#ffbf3a']
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  } */






}
