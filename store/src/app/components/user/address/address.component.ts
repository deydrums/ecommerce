import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public loading_btn:boolean;
  public loader: boolean;
  public address:any;
  public token;

  constructor(
    private _clientService : ClientService,
    private _iziToastService: IziToastService
  ) { 
    this.loading_btn = false;
    this.loader = false;
    this.address = {
      principal: false
    }
    this.token = this._clientService.getToken();
  }

  ngOnInit(): void {
  }

  register(registerForm:any){
    this.loading_btn = true;
    if(registerForm.valid){
      this._clientService.registerAddress(this.address, this.token).subscribe(
        response => {
          this._iziToastService.showMsg(response.message, "success");
          this.address = {
            principal: false
          }
          this.loading_btn = false;
        },
        error => {
          this._iziToastService.showMsg(error.error.message, "error");
          this.loading_btn = false;
          console.log(error)
        }
      )
    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");
      this.loading_btn = false;
    }
  }

}
