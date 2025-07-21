import { Component, OnInit } from '@angular/core';
import { CategoriesLivesService } from 'src/app/services/categories-lives.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  categorias: string[] = ['electrodomesticos', 'belleza','vestimenta', 'calzados'];
  vivos: any[] = [];


  constructor(private liveService: CategoriesLivesService ) { }

  seleccionarCategoria(event: Event) {

    const selectElement = event.target as HTMLSelectElement;
    const categoriaSeleccionada = selectElement.value;
    if (categoriaSeleccionada) {
      this.liveService.getVivosPorCategoria(categoriaSeleccionada).subscribe((vivos) => {
        this.vivos = vivos;
      });
    } else {
      this.vivos = [];
    }
  }


  

  ngOnInit(): void {
  }

}
