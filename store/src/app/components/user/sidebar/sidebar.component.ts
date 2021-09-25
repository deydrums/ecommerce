import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user:User;
  public token:any;

  constructor(
    private _clientService: ClientService
  ) {
    this.token = _clientService.getToken();
    this.user = new User('','','','','','','','','','','');
   }

  ngOnInit(): void {
    this._clientService.getClient(this.token).subscribe(
      response => {
        this.user = response.data;
      },
      error => {
        console.log(error.error.message)
      }
    )

  }

}
