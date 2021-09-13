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
  public page = 1;
  public pageSize = 1;

  constructor(
    private _clientService : ClientService,
  ) { }

  ngOnInit(): void {
    this._clientService.getClientsFilterAdmin(null,null).subscribe(
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
      this._clientService.getClientsFilterAdmin(type,this.filterSurname).subscribe(
        response=>{
          this.clients = response.data;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }else if(type == 'email'){
      this._clientService.getClientsFilterAdmin(type,this.filterEmail).subscribe(
        response=>{
          this.clients = response.data;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }

  }

}
