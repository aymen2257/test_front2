import { Component } from '@angular/core';
import { ContratService } from '../_services/contrat.service';

@Component({
  selector: 'app-liste-contrat',
  templateUrl: './liste-contrat.component.html',
  styleUrl: './liste-contrat.component.css'
})
export class ListeContratComponent {

  contrats: any
  id: any


  constructor(private contratService: ContratService) { }


  ngOnInit(): void {
    this.getAllContrats();
  }

  getAllContrats() {
    this.contratService.getAllContrats().subscribe(
      data => {
        console.log("this is data :" + data);
        console.log(data);
        this.contrats = data;
        console.log("contrat:" + this.contrats);

      },
      err => {
        console.log(err);
        console.log("there is error here");

      }
    );
  }


}
