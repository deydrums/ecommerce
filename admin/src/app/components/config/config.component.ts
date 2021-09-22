import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ConfigService } from 'src/app/services/config.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token;
  public config:any;
  public loading_btn:boolean;
  public loading: boolean;
  public url;
  public cat_title:any = '';
  public cat_icon:any = '';

  constructor(
    private _configService: ConfigService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService,
  ) { 
    this.token = this._adminService.getToken();
    this.loading_btn = false;
    this.url = global.url;
    this.loading = true;
    this.config = null;
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig():void{
    this.loading = true;
    this._configService.getConfig(this.token).subscribe(
      response=>{
        this.config = response.data;
        this.loading = false;
        console.log(this.config)
      },
      error=>{
        this.loading = false;
      }
    )
    
  }

  addCat(){
    if(this.cat_title && this.cat_icon){
      console.log(uuidv1())
      this.config.categories.push({
        title: this.cat_title,
        icon: this.cat_icon,
        _id: uuidv1()
      })
    }else{
      this._iziToastService.showMsg("Los datos de la categoria no son validos", "error");
    }
  }

}
