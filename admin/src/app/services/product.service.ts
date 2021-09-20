import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url;

  constructor(private _http: HttpClient){
    this.url = global.url;
  }

  register(data: any, file: any, token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization':token});
    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("description", data.description);
    formData.append("banner", file);
    return this._http.post(this.url+'product/register',formData,{headers});
  }

  getProductsAdmin(filter:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'product/getProductsAdmin/'+filter,{headers});
  }

  getProductByIdAdmin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'product/getProductByIdAdmin/'+id,{headers});
  }
  
}
