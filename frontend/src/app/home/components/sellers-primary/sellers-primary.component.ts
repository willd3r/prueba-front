import { Component, OnInit } from '@angular/core';
import { Professional, ProfessionalService } from 'src/app/services/profesional.service';

interface WorkerDisplay {
  name: string;
  text: string;
  stars: number;
  image: string;
}


@Component({
  selector: 'app-sellers-primary',
  templateUrl: './sellers-primary.component.html',
  styleUrls: ['./sellers-primary.component.scss']
})
export class SellersPrimaryComponent implements OnInit {
 workers: Professional[]  =   [];

    constructor(private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    this.loadProfessionals();
  }

   loadProfessionals(): void {
    this.professionalService.getAllProfessionals().subscribe(
      (data: Professional[]) => {
        // Asignar los profesionales al arreglo workers, manteniendo la estructura del modelo
        this.workers = data.map((prof) => ({
          ...prof, // Mantiene todas las propiedades de Professional
          text: prof.profession, // Puedes agregar la propiedad text para mostrar como descripción
          stars: Math.round(prof.score / 2), // Convierte el score de 0-10 a 5 estrellas
          image: 'https://picsum.photos/200/300' // Puedes asignar una imagen por defecto o usar una propiedad
        }));
      },
      (error) => {
        console.error('Error al obtener profesionales:', error);
      }
    );
  }

}
