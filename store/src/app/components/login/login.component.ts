import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _iziToastService: IziToastService,
    private _clientService : ClientService,
  ) { 
    this.loading_btn = false;
  }

  ngOnInit(): void {
  }

  login(loginForm: any){
    this.loading_btn = true;
    if(loginForm.valid){
      this._clientService.login(loginForm.form.value).subscribe(
        response => {
          console.log(response)
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
