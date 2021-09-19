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
    let headers = new HttpHeaders({'Authorization':token});
    let fd = new FormData();
    fd.append('title', data.title);
    

    return this._http.post(this.url+'product/register',fd,{headers:headers});
  }
  
}
