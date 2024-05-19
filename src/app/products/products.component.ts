import { Component } from '@angular/core';
import { ProduitService } from '../_services/produit.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {


  produits: any
  id: any


  constructor(private produitService: ProduitService ,  private router:Router ,  private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.getAllproduits();
  }

  getAllproduits() {
    this.produitService.getAllProduits().subscribe(
      data => {
        console.log("this is data :" + data);
        console.log(data);
        this.produits = data;
        console.log("produit:" + this.produits);

      },
      err => {
        console.log(err);
        console.log("there is error here in liste produits");
      }
    );
  }

  navigate(id:any){
    this.router.navigate(["/add-produit/"+id])
  }



  navigate2(){
    this.router.navigate(["/add-produit/"])
  }

  getSafeImage(image: string | null): SafeUrl | null {
    if (image) {
      const imageUrl = 'data:image/png;base64,' + image;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }

  getSafeIcon(icon: string | null): SafeUrl | null {
    if (icon) {
      const iconUrl = 'data:image/svg+xml;base64,' + icon;
      return this.sanitizer.bypassSecurityTrustUrl(iconUrl);
    }
    return null;
  }

  deleteproduit(id:any){
    this.produitService.deleteProduit(id).subscribe(
      (response)=>{
      console.log("here response deleted from BE ",response);
      this.getAllproduits()
      },
      (error) => {
        console.error('Error deleting produit:', error);
      }
    )
  }


}
