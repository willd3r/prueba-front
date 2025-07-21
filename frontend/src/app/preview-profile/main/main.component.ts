import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  workerData: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['worker']) {
        try {
          this.workerData = JSON.parse(params['worker']);
          console.log('Datos del worker recibidos:', this.workerData);
        } catch (error) {
          console.error('Error al parsear los datos del worker:', error);
          // Si hay error, usar datos por defecto
          this.workerData = {
            name: 'Usuario',
            profession: 'Profesional',
            score: 0,
            description: 'Sin descripción disponible',
            image: null,
            location: 'Argentina',
            category: 'General'
          };
        }
      } else {
        // Si no hay parámetros, usar datos por defecto
        this.workerData = {
          name: 'Usuario',
          profession: 'Profesional',
          score: 0,
          description: 'Sin descripción disponible',
          image: null,
          location: 'Argentina',
          category: 'General'
        };
      }
    });
  }

}
