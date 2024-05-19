import { Component } from '@angular/core';
import { ProduitService } from '../_services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-un-produit',
  templateUrl: './un-produit.component.html',
  styleUrl: './un-produit.component.css'
})
export class UnProduitComponent {

  produit: any = {}
  id:any
  destinations: any=[];
  idDestination :any

  constructor(private produitService:ProduitService , private activatedRoute:ActivatedRoute ,private router:Router , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.paramMap.get("id")
    if (this.id){
      this.getproduitById();
  }
  }




  getproduitById(){
    this.produitService.getProduitById(this.id).subscribe(
      (response)=>{console.log("here produit by id",response);
    this.produit=response
    }

    )
  }

  getSafeImage(image: string | null): SafeUrl | null {
    if (image) {
      // Si vous avez une chaîne base64, créez une URL sécurisée
      const imageUrl = 'data:image/png;base64,' + image;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }


}
