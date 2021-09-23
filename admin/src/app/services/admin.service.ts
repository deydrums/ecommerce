import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  renew(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token});
    return this._http.get(this.url+'admin/token',{headers:headers});
  }


  public isAuthenticated(allowRoles : string[]):boolean{

    const token = localStorage.getItem('token');

    if(!token){
      return false;
    }
    
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);      
      if(!decodedToken){
        //console.log('No es valido');
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }
}
