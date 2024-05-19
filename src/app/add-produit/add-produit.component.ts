import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProduitService } from '../_services/produit.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent {

  produit: any = {};
  IconFile: File | null = null;
  ImageFile: File | null = null;

  id: any;
  title = "ajouter produit"


  constructor(private tokenStorageService: TokenStorageService, private activatedRoute: ActivatedRoute, private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    if (this.id) {
      this.title = "modifier produit"
      this.getproduitById();
    }
  }
 
  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.ImageFile = fileList[0];
    } else {
      this.ImageFile = null;
    }
  }

  onFileChange2(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.IconFile = fileList[0];
    } else {
      this.IconFile = null;
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill all required fields.');
      return;
    }
    if (this.IconFile && this.ImageFile && this.id) {

      this.produitService.editProduit(this.IconFile,this.ImageFile,this.produit).subscribe({
        next: response => {
          console.log('Produit updated successfully', response);
          alert('Produit updated successfully');
        },
        error: error => {
          console.error('Failed to update Produit', error);
          alert('Failed to update Produit: ' + error.message);
        }
      });
    } else if (this.IconFile && this.ImageFile && !this.id) {
      this.produitService.addProduit(this.IconFile, this.ImageFile, this.produit).subscribe({
        next: response => {
          console.log('Produit submitted successfully', response);
          alert('Produit submitted successfully');
        },
        error: error => {
          console.error('Failed to submit Produit', error);
          alert('Failed to submit Produit: ' + error.message);
        }
      });
    } else {
      alert('Please attach a file.');
    }
  }


  getproduitById() {
    this.produitService.getProduitById(this.id).subscribe(
      (response) => {
        console.log("here produit by id", response);
        this.produit = response
      }
    )
  }
}
