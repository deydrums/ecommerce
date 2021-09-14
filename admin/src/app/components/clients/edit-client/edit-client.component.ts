import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
declare var iziToast:any;
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public client : any = {};
  public id: any;
  public token;

  constructor(
    private _route : ActivatedRoute,
    private _clientService : ClientService,
    private _adminService : AdminService,
    private _router : Router,

  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];  
        this._clientService.getClientByIdAdmin(this.id,this.token).subscribe(
          response=>{
            this.client = response.data;
          },
          error =>{
            iziToast.show({
              title: 'Error',
              titleColor: '#ff0000',
              color: '#fff',
              class: 'text-danger',
              position: 'topRight',
              message: error.error.message
            })
          }
        )      
      }
    )
  }

  update(updateForm: any){
    if(updateForm.valid){
      this._clientService.updateClientAdmin(this.client,this.id,this.token).subscribe(
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
