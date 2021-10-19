import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  getProductBySlug(slug:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get(this.url+'product/getProductBySlug/'+slug,{headers:headers});
  }


}
