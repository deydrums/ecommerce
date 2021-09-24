import { Component, DoCheck, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  public token;
  public id;
  public userlog:any;
  constructor(
    private _clientService : ClientService
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    // this._clientService.getClient(this.id, this.token).subscribe(
    //   response => {
    //     this.user = response.data;
    //     localStorage.setItem('user_data', JSON.stringify(this.user));
        
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  ngOnInit(): void {

  }

  ngDoCheck():void {
    if(localStorage.getItem('user_data')){
      this.userlog = JSON.parse(<any>localStorage.getItem('user_data'));
    }else{
      this.userlog = undefined;
    }
  }



}
