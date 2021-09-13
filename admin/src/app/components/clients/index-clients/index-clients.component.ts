import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-index-clients',
  templateUrl: './index-clients.component.html',
  styleUrls: ['./index-clients.component.css']
})
export class IndexClientsComponent implements OnInit {

  public clients : Array<any> = [];
  public filterSurname = "";
  public filterEmail = "";

  constructor(
    private _clientService : ClientService,
  ) { }

  ngOnInit(): void {
    this._clientService.getClientsFilterAdmin().subscribe(
      response=>{
        this.clients = response.data;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  filter(type:any){
    console.log(type);
    console.log(this.filterSurname);
    console.log(this.filterEmail);
  }

}
