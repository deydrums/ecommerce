import { Injectable } from '@angular/core';

declare var iziToast:any;

@Injectable({
  providedIn: 'root'
})
export class IziToastService {

  constructor() { }


  showMsg(msg: any, type: any):any{

    let color;
    let title;
    if(type == 'error'){
      color = '#ff0000';
      title = 'Error';
    }else if(type == 'success'){
      color = '#1dc74c';
      title = 'Hecho';
    }
    return(
      iziToast.show({
        title: title,
        titleColor: color,
        color: '#fff',
        class: 'text-success',
        position: 'topRight',
        message: msg
      })
    )
  }
}
