import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public client : any = {
    gender: ''
  };

  public token;
  public loading_btn = false;

  constructor(
    private _clientService : ClientService,
    private _adminService : AdminService,
    private _router : Router,
    private _iziToastService: IziToastService
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

  register(registerForm : any){
    if(registerForm.valid){
      this.loading_btn = true;
      this._clientService.registerClientAdmin(this.client,this.token).subscribe(
        response=>{
          this._iziToastService.showMsg(response.message, "success");
          this.client = {};
          this.loading_btn = false;
          this._router.navigate(['/panel/clients']);
        },
        error=>{
          const errors = error.error.errors;
          if(errors){
            for (const error in errors) {
              this._iziToastService.showMsg(errors[error].msg, "error");
            }
          }else{
            this._iziToastService.showMsg(error.error.message, "error");
          }
          this.loading_btn = false;
        }
      );
    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");
      this.loading_btn = false;
    }
  }

}
