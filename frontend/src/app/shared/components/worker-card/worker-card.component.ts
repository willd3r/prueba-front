import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.scss']
})
export class WorkerCardComponent implements OnInit {

  @Input() worker: any;

  @Input() dark: boolean = false;

  @Input() border: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  counter(i: number) : any[]{
    
    return [1,2]
  }

  getProfile(){
    // Pasar los datos del worker como parámetros de ruta
    const workerData = {
      id: this.worker._id || this.worker.id,
      name: this.worker.name,
      profession: this.worker.profession,
      score: this.worker.score,
      description: this.worker.description || this.worker.text,
      image: this.worker.image,
      location: this.worker.location || 'Argentina',
      category: this.worker.category || this.worker.categorie
    };
    
    return this.router.navigate(['preview-profile'], { 
      queryParams: { worker: JSON.stringify(workerData) }
    });
  }

}
