import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './services/client.service';
import { IziToastService } from './services/helpers/izi-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'store';
  public token;
  public userLoged:any={};

  constructor (
    private _clientService: ClientService,
    private _router: Router,
    private _iziToastService: IziToastService,

  ){
    this.token = _clientService.getToken();
  }

  ngOnInit(): void {
    if(this.token){this.renew(this.token);}
  }

  ngDoCheck(): void {
  }

  renew(token:any): void {
    this._clientService.renew(token).subscribe(
      response => {
        this.userLoged=response.data;
        localStorage.setItem('token',response.token);
        localStorage.setItem('_id', response.data._id);
      },
      error => {
        localStorage.clear();
        this._iziToastService.showMsg('La sesión ha expirado', 'error');
        this._router.navigate(['/login']);
      }
    )
  }
}

