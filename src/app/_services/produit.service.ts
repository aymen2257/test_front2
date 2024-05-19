import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }
  getAllProduits(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'produits/getallProduits', httpOptions);
  }


  addProduit(fileIcon:File, file:File ,produit: any ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileIcon', fileIcon);
    formData.append('file', file);
    Object.keys(produit).forEach(key => {
      if (produit[key] != null) {
        formData.append(key, produit[key]);
      }
    });

    return this.http.post(AppConstants.API_URL + 'produits/addProduit', formData, {
      responseType: 'json'  // Specify that the response is expected to be in JSON format
    });
  }



  editProduit(fileIcon:File, file:File ,produit: any ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileIcon', fileIcon);
    formData.append('file', file);
    Object.keys(produit).forEach(key => {
      if (produit[key] != null) {
        formData.append(key, produit[key]);
      }
    });

    return this.http.put(AppConstants.API_URL + 'produits/editProduit', formData, {
      responseType: 'json'  // Specify that the response is expected to be in JSON format
    });
  }

  getProduitById(id:any): Observable<any> {
    return this.http.get(AppConstants.API_URL+`produits/getproduit/${id}`, httpOptions);
  }

  deleteProduit(id:any): Observable<any> {
    return this.http.delete(AppConstants.API_URL+`produits/deleteProduit/${id}`, httpOptions);
  }


}
