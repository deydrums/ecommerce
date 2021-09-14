import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  }

}
