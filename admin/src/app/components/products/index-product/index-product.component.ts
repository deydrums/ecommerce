import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { global } from '../../../services/global';
import Swal from 'sweetalert2';
import {Workbook} from 'exceljs';
import * as fs  from 'file-saver'

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {
  
  public loading: boolean;
  public filter : string;
  public token;
  public products: Array<any> = [];
  public url: string;
  public page = 1;
  public pageSize = 10;
  public loading_btn: boolean = false;
  public arr_products: Array<any> = [];

  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService
  ) {
    this.loading = true;
    this.filter = '';
    this.token = _adminService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getProducts()
  }

  filterProduct(){
    this.getProducts()
  }

  getProducts() {
    this.loading = true;
    this._productService.getProductsAdmin(this.filter,this.token).subscribe(
      response => {
        this.products = response.data;
        this.products.forEach(product =>{
          this.arr_products.push({
            titulo: product.title,
            stock: product.stock,
            precio: product.price,
            categoria: product.category,
            nventas: product.nsales,
          })
        })
        this.loading = false;
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    )
  }

  delete(id:any, title:any){
    Swal.fire({
      title: 'Eliminar Cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No',
      html: '<span style="color: white">Quieres el producto: ' + title + '<span>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading_btn = true;
        this._productService.delete(id, this.token).subscribe(
          response => {
            this._iziToastService.showMsg(response.message, "success");
            this.loading_btn = false;
            this.getProducts();
          },
          error => {
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading_btn = false;
          }
        )
      }
    })


  }

  downloadExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_products){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }


}

