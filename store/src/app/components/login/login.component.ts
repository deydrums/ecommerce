import { Component, OnInit } from '@angular/core';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {};

  constructor(
    private _iziToastService: IziToastService
  ) { }

  ngOnInit(): void {
  }

  login(loginForm: any){
    if(loginForm.valid){

    }else{
      this._iziToastService.showMsg("El formulario no es valido", "error");
    }
  }

}
