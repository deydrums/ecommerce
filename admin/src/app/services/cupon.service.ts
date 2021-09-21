import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url;

  constructor(private _http: HttpClient){
    this.url = global.url;
  }

  register(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.post(this.url+'cupon/register',data,{headers:headers});
  }

  getCupons(filter:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'cupon/'+filter,{headers:headers});
  }

  deleteCupon(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.delete(this.url+'cupon/'+id,{headers:headers});
  }
}
