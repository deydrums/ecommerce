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

  update(data: any, file:any, token:any):Observable<any>{
    
    const headers = new HttpHeaders({'Authorization':token});
    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("serie", data.serie);
    formData.append("correlative", data.correlative);
    formData.append('categories', 
      JSON.stringify(data.categories)
    );
    if(file){
      formData.append("banner", file);
    }
    return this._http.put(this.url+'config',formData,{headers});
  }
  
  getConfigAll():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get(this.url+'config/all',{headers:headers});
  }

}
