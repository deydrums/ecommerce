import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CuponService } from 'src/app/services/cupon.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
declare var jQuery:any;
declare var $:any;

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
  public filter : String;

  constructor(
    private _adminService : AdminService,
    private _cuponService : CuponService,
    private _iziToastService: IziToastService
  ) {
    this.loading = true;
    this.loading_btn = false;
    this.token = this._adminService.getToken();
    this.cupons = [];
    this.filter = '';
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.loading = true;
    this._cuponService.getCupons(this.filter,this.token).subscribe(
      response=>{
        this.cupons = response.data;
        this.loading = false;
      },
      error=>{
        console.log(error)
        this.loading = false;
      }
    )
  }

  filterCupon(){
    this.getData();
  }

  delete(id:any){
    this.loading_btn = true;
    this._cuponService.deleteCupon(id,this.token).subscribe(
      response =>{
        this._iziToastService.showMsg(response.message, 'success');
        this.loading_btn = false;
        this.getData();
      },
      error =>{
        this.loading_btn = false;
        this._iziToastService.showMsg(error.error.message, 'error');
      }
    )
    $('#delete-'+id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }

}
