import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-clients',
  templateUrl: './index-clients.component.html',
  styleUrls: ['./index-clients.component.css']
})
export class IndexClientsComponent implements OnInit {

  public clients : Array<any> = [];
  public filterSurname = "";
  public filterEmail = "";
  public page = 1;
  public pageSize = 4;
  public token;

  constructor(
    private _clientService : ClientService,
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
   }

  ngOnInit(): void {
    this._clientService.getClientsFilterAdmin(null,null,this.token).subscribe(
      response=>{
        this.clients = response.data;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  filter(type:any){
    if(type == 'surname'){
      this._clientService.getClientsFilterAdmin(type,this.filterSurname,this.token).subscribe(
        response=>{
          this.clients = response.data;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }else if(type == 'email'){
      this._clientService.getClientsFilterAdmin(type,this.filterEmail, this.token).subscribe(
        response=>{
          this.clients = response.data;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }

  }


  delete(id:any){
    this._clientService.deleteClientAdmin(id, this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'Hecho',
          titleColor: '#1dc74c',
          color: '#fff',
          class: 'text-success',
          position: 'topRight',
          message: response.message
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.ngOnInit();
      },
      error=>{
        iziToast.show({
          title: 'Error',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-danger',
          position: 'topRight',
          message: error.error.message
        });
        
      }
    );
  }

}
