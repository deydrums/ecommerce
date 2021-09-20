import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
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
  public loading = true;
  public loading_btn: boolean = false;


  constructor(
    private _clientService : ClientService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService
  ) {
    this.token = _adminService.getToken();
   }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this._clientService.getClientsFilterAdmin(null,null,this.token).subscribe(
      response=>{
        this.clients = response.data;
        this.loading = false;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  filter(type:any){
    this.loading = true;
    if(type == 'surname'){
      this._clientService.getClientsFilterAdmin(type,this.filterSurname,this.token).subscribe(
        response=>{
          this.clients = response.data;
          this.loading = false;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }else if(type == 'email'){
      this._clientService.getClientsFilterAdmin(type,this.filterEmail, this.token).subscribe(
        response=>{
          this.clients = response.data;
          this.loading = false;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }

  }


  delete(id:any){
    this.loading_btn = true;
    this._clientService.deleteClientAdmin(id, this.token).subscribe(
      response=>{
        this._iziToastService.showMsg(response.message, "success");
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.initData();
        this.loading_btn = false;
      },
      error=>{
        this._iziToastService.showMsg(error.error.message, "error");
        this.loading_btn = false;
      }
    );
  }

}
