import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
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
  public loading_btn = false;
  public loading = true;

  constructor(
    private _route : ActivatedRoute,
    private _clientService : ClientService,
    private _adminService : AdminService,
    private _router : Router,
    private _iziToastService: IziToastService

  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];  
        this._clientService.getClientByIdAdmin(this.id,this.token).subscribe(
          response=>{
            this.client = response.data;
            this.loading = false;
          },
          error =>{
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading = false;
            this._router.navigate(['/panel/clients'])
          }
        )      
      }
    )
  }

  update(updateForm: any){
    this.loading_btn = true;
    if(updateForm.valid){
      this._clientService.updateClientAdmin(this.client,this.id,this.token).subscribe(
        response=>{
          this._iziToastService.showMsg(response.message, "success");
          this.loading_btn = false;
          this.getUser();
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
