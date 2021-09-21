import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CuponService } from 'src/app/services/cupon.service';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public page = 1;
  public pageSize = 4;
  public token;
  public loading:boolean;
  public loading_btn: boolean;
  public cupons : Array<any> ;


  constructor(
    private _adminService : AdminService,
    private _cuponService : CuponService
  ) {
    this.loading = true;
    this.loading_btn = false;
    this.token = this._adminService.getToken();
    this.cupons = [];
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.loading = true;
    this._cuponService.getCupons(this.token).subscribe(
      response=>{
        this.cupons = response.data;
        this.loading = false;
        console.log(this.cupons)
      },
      error=>{
        console.log(error)
        this.loading = false;
      }
    )
  }

}
