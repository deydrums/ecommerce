import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private _http: HttpClient){
    this.url = global.url;
}

  loginAdmin(user:any):Observable<any>{
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'admin/login',json,{headers:headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }


}
