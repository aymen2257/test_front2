import { Component } from '@angular/core';
import { ReclamtionService } from '../_services/reclamtion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reclamtionuser',
  templateUrl: './reclamtionuser.component.html',
  styleUrl: './reclamtionuser.component.css'
})
export class ReclamtionuserComponent {
  reclamations: any[] = [];
  userId!: number;



  constructor(private reclamationService: ReclamtionService) {}

  ngOnInit(): void {
    this.reclamationService.getUserReclamations().subscribe(
      (data) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error fetching user reclamations', error);
      }
    );
  }
}
