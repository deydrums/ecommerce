import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

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
    private _clientService: ClientService
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
        console.log(response)
      },
      error => {
        console.log(error)
        this.loader = false;
      }
    )
  }

}
