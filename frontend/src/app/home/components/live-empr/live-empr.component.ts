import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-empr',
  templateUrl: './live-empr.component.html',
  styleUrls: ['./live-empr.component.scss']
})
export class LiveEmprComponent implements OnInit {


  public buttonsAction: Array<any> = [
    { 
      icon: "store_mall_directory", 
      color: "primary",
      title: 'live',
      iconLive: 'fiber_manual_record'
      
    },
    { 
      id: 2,
      color: "primary" ,
      title: 'at. al cliente',
     
      
    },
    { 
      id: 3,
      color: "primary" ,
      title: 'afiliados',
      
     
    }
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
