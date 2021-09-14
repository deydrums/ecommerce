import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

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

  constructor(
    private _clientService : ClientService,
    private _adminService : AdminService,
    private _router : Router,
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

  register(registerForm : any){
    if(registerForm.valid){
      this._clientService.registerClientAdmin(this.client,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Hecho',
            titleColor: '#1dc74c',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: response.message
          });
          this.client = {};

          this._router.navigate(['/panel/clients']);
        },
        error=>{
          iziToast.show({
            title: 'Error',
            titleColor: '#ff0000',
            color: '#fff',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.message
          })
        }
      );
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    }
  }

}
