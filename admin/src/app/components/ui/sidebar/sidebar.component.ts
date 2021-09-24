import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  linkClick(){
      if ($("body").hasClass("sidebar-open")) {
          $("body").removeClass("sidebar-open");
          $("body").addClass("sidebar-closed");
          $("body").addClass("sidebar-collapse");
      }
  }

}
