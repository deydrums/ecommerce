import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public client:any;
  public token;
  public loading_btn:boolean;
  public loader: boolean;

  constructor(
    private _clientService: ClientService,
    private _iziToastService: IziToastService
  ) {
    this.token = this._clientService.getToken();
    this.loading_btn = false;
    this.loader = true;
   }

  ngOnInit(): void {
    this.loader = true;
    this.client = this._clientService.getClient(this.token).subscribe(
      response => {
        this.client = response.data;
        this.loader = false;
      },
      error => {
        console.log(error)
        this.loader = false;
      }
    )
  }

  update(updateForm:any) {
    this.loading_btn = true;
    if(updateForm.valid){
      this._clientService.update(this.client._id, updateForm.form.value, this.token).subscribe(
        response => {
          this._iziToastService.showMsg(response.message, "success");
          this.client = response.data;
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
