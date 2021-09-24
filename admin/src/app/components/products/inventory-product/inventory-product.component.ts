import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import {Workbook} from 'exceljs';
import * as fs  from 'file-saver'

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
  styleUrls: ['./inventory-product.component.css']
})
export class InventoryProductComponent implements OnInit {

  public product: any = null;
  public token;

  public file : any | File = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/default.jpg';
  public loading_btn:boolean;
  public loading: boolean;
  public url;
  public id;
  public inventory: any = null;
  public newInventory: any = {};
  public arr_inventory: Array<any> = [];


  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.token = this._adminService.getToken();
    this.loading_btn = false;
    this.url = global.url;
    this.id = '';
    this.loading = true;
  }


  ngOnInit(): void {
    this.getdata()
  }
  
  getdata(){
    this.loading = true;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];  
        this._productService.getProductByIdAdmin(this.id,this.token).subscribe(
          response=>{
            this.product = response.data;
            this.imgSelect = this.url +'product/getBanner/' + response.data.banner;
            this._productService.getInventoryAdmin(this.product._id, this.token).subscribe(
              response => {
                this.inventory = response.data;
                this.inventory.forEach((inv: { admin: any; amount: any; supplier: any; }) =>{
                  this.arr_inventory.push({
                    admin: inv.admin.name + ' ' + inv.admin.surname,
                    cantidad: inv.amount,
                    proveedor: inv.supplier,
                  })
                })
                console.log(this.arr_inventory)
                this.loading = false;
              },
              error => {
                console.log(error);
                this.loading = false;
              }
            )
          },
          error =>{
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading = false;
            this._router.navigate(['/panel/products'])
          }
        )      
      }
    )
  }

  delete(id:any, supplier:any, amount:any) {
    Swal.fire({
      title: 'Eliminar Inventario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No',
      html: '<span style="color: white">¿Quieres el inventario del proveedor: ' + supplier + ', con cantidad: '+ amount + '?</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading_btn = true;
        this._productService.deleteInventoryAdmin(id, this.token).subscribe(
          response => {
            this._iziToastService.showMsg(response.message, "success");
            this.getdata();
            this.loading_btn = false;
          },
          error => {
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading_btn = false;
          }
        )
      }
    })
  }



  registerInventory(inventoryForm:any){
    if(inventoryForm.valid){
      this.loading_btn = true;
      this.newInventory = {
        ...this.newInventory,
        product: this.product._id
      }
      this._productService.registerInventoryAdmin(this.newInventory,this.token).subscribe(
        response =>{
          this._iziToastService.showMsg(response.message, "success");
          this.getdata();
          this.loading_btn = false;
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
      )

    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");
      this.loading_btn = false;
    }
  }



  downloadExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_inventory){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Admin', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}

