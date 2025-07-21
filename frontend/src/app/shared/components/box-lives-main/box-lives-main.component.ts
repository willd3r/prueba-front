import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-box-lives-main',
  templateUrl: './box-lives-main.component.html',
  styleUrls: ['./box-lives-main.component.scss']
})
export class BoxLivesMainComponent implements OnInit, OnDestroy {

  public buttonsAction: Array<any> = [
    { 
      id:1,
      icon: "store_mall_directory", 
      color: "white",
      title: 'LIVE',
      iconLive: 'fiber_manual_record'
      
    },
    { 
      id:2,
      color: "primary"
    },
    { 
      id: 3,
      color: "primary" ,
      title: 'afiliados',
      
     
    }
  ];

  // Contador simple de espectadores
  public currentViewers: number = 0;
  private viewersInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.initializeViewers();
  }

  ngOnDestroy(): void {
    if (this.viewersInterval) {
      clearInterval(this.viewersInterval);
    }
  }

  private initializeViewers(): void {
    // Número inicial aleatorio entre 50 y 150
    this.currentViewers = Math.floor(Math.random() * 101) + 50;
    
    // Actualizar cada 4-7 segundos
    this.viewersInterval = setInterval(() => {
      const change = Math.floor(Math.random() * 11) - 5; // -5 a +5
      this.currentViewers += change;
      
      // Mantener entre 30 y 200
      if (this.currentViewers < 30) this.currentViewers = 30;
      if (this.currentViewers > 200) this.currentViewers = 200;
    }, Math.random() * 3000 + 4000);
  }

}
