import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public client : any = {
    gender: ''
  };

  public cupon : any;
  public token;
  public loading_btn:boolean;

  constructor(
    private _adminService : AdminService,
    private _router : Router,
    private _iziToastService: IziToastService
  ) {
    this.token = this._adminService.getToken();
    this.loading_btn = false;
    this.cupon = {
      type: ''
    };
   }

  ngOnInit(): void {
  }

  register(registerForm : any){
    if(registerForm.valid){
      this.loading_btn = true;
      this.loading_btn = false;
      console.log(this.cupon)
    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");
      this.loading_btn = false;
    }
  }


}
