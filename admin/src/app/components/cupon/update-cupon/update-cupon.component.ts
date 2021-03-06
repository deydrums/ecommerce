import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CuponService } from 'src/app/services/cupon.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public cupon : any;
  public token;
  public loading_btn:boolean;
  public id: String;
  public loading: boolean;

  constructor(
    private _adminService : AdminService,
    private _router : Router,
    private _iziToastService: IziToastService,
    private _cuponService: CuponService,
    private _route : ActivatedRoute
  ) {
    this.token = this._adminService.getToken();
    this.loading_btn = false;
    this.loading = false;
    this.id = '';
    this.cupon = {
      type: ''
    };
   }

  ngOnInit(): void {
    this.getCupon();
  }

  update(updatedForm:any){
    this.loading_btn = true;
    if(updatedForm.valid){
      this._cuponService.updateCupon(this.id, this.cupon, this.token).subscribe(
        response=>{
          this._iziToastService.showMsg(response.message, "success");
          this.loading_btn = false;
          this.getCupon();
        },
        error=>{
          const errors = error.error.errors;
          if(errors){
            for (const error in errors) {
              this._iziToastService.showMsg(errors[error].msg, "error");
            }
          }else{
            this._iziToastService.showMsg(error.error.message, "error");
          }
          this.loading_btn = false;
        }
      );
    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");
      this.loading_btn = false;
    }
  }

  getCupon(): void{
    this.loading = true;
    this._route.params.subscribe(
      params=>{
        this.id = params['id']; 
        console.log(this.id) 
        this._cuponService.getCupon(this.id,this.token).subscribe(
          response=>{
            this.cupon = response.data;
            this.loading = false;
          },
          error =>{
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading = false;
            this._router.navigate(['/panel/cupon']);
          }
        )      
      }
    )

  }

}
