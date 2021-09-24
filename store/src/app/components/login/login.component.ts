import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {};
  public loading_btn:boolean;
  public token;

  constructor(
    private _iziToastService: IziToastService,
    private _clientService : ClientService,
    private _router: Router
  ) { 
    this.loading_btn = false;
    this.token = localStorage.getItem('token');
    if(this.token){
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login(loginForm: any){
    this.loading_btn = true;
    if(loginForm.valid){
      this._clientService.login(loginForm.form.value).subscribe(
        response => {
          localStorage.setItem('token',response.token);
          localStorage.setItem('_id', response.data._id);
          localStorage.setItem('user_data', JSON.stringify(response.data));
          this._router.navigate(['/']);
          this.loading_btn = false;
        },
        error => {
          this._iziToastService.showMsg(error.error.message, "error");
          this.loading_btn = false;
        }
      )
    }else{
      this._iziToastService.showMsg("El formulario no es valido", "error");
      this.loading_btn = false;
    }
  }

}
