import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url;

  constructor(private _http: HttpClient){
    this.url = global.url;
  }

  
  getConfig(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'config',{headers:headers});
  }
}
