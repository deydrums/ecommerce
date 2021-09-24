import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  login(user:any):Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'client/login',user,{headers})
  }
}
