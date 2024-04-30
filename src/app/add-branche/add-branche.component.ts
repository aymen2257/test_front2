import { Component } from '@angular/core';
import { BrancheService } from '../_services/branche.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-branche',
  templateUrl: './add-branche.component.html',
  styleUrl: './add-branche.component.css'
})
export class AddBrancheComponent {

  branche: any = {};
  isSuccessful = false;
  errorMessage = '';

  test=true

  id:any
  title="ajouter branche"
  


  constructor(private brancheService:BrancheService , private activatedRoute:ActivatedRoute ,private router:Router ) { }


  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.paramMap.get("id")
    if (this.id){
      this.title="modifier branche"
      this.getbrancheById();
  }
  
}

add() {
  if (this.id) {
    // Edit branche
    this.brancheService.editBranche(this.branche).subscribe(
      (response: any) => {
        console.log('here response updated from BE', response);
      },
      (error) => {
        console.error('Error updating branche:', error);
      }
    );
  } else {
    // Add branche
    this.brancheService.addBranche(this.branche).subscribe(
      (response: any) => {
        console.log('here response from BE', response);
      },
      (error) => {
        console.error('Error adding branche:', error);
      }
    );
  }
  this.isSuccessful = true;
  this.router.navigate(['/branches']);
}


getbrancheById(){
  this.brancheService.getBrancheById(this.id).subscribe(
    (response)=>{console.log("here branche by id",response);
  this.branche=response
  }
  )
}


}
