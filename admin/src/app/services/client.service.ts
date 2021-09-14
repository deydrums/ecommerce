import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url;

  constructor(private _http: HttpClient){
    this.url = global.url;
  }

  getClientsFilterAdmin(type:any, filter:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'client/getClientsFilterAdmin/'+type+'/'+filter,{headers:headers});
  }

  registerClientAdmin(data: any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.post(this.url+'client/registerClientAdmin',data,{headers:headers});
  }
  
  getClientByIdAdmin(id: any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'client/getClientByIdAdmin/'+id,{headers:headers});
  }


  updateClientAdmin(data: any, id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.put(this.url+'client/updateClientAdmin/'+id,data,{headers:headers});
  }

}
