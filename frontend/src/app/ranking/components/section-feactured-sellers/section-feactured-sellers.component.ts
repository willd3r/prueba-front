import { Component, OnInit } from '@angular/core';
import { AutonomousService } from './../../../services/autonomous.service';
import { SellersCategoryRankedService } from 'src/app/services/sellers-category-ranked.service';
import { Autonomous } from 'src/app/services/autonomous.service';
import { Dedicated } from 'src/app/services/dedicated.service';
import { Professional } from 'src/app/services/profesional.service';
import { DedicatedService } from 'src/app/services/dedicated.service';
import { ProfessionalService } from 'src/app/services/profesional.service';
import { RankingService } from 'src/app/services/ranking.service'; // Importar el servicio

@Component({
  selector: 'app-section-feactured-sellers',
  templateUrl: './section-feactured-sellers.component.html',
  styleUrls: ['./section-feactured-sellers.component.scss'],
})
export class SectionFeacturedSellersComponent implements OnInit {
  categories = ['Tecnologia', 'Electronica', 'Deportes', 'Social'];
  sellersAvailable: (Autonomous | Dedicated | Professional)[] = [];
  selectedCategory: string | null = null;
  rankings: any[] = []; // Variable para almacenar los rankings

  constructor(
    private autonomousService: AutonomousService,
    private dedicatedService: DedicatedService,
    private profesionalService: ProfessionalService,
    private rankingService: RankingService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.loadSellers();
    this.loadRankings(); // Cargar los rankings al inicializar el componente
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.sellersAvailable = [];
    this.loadSellers();
  }

  loadSellers(): void {
    this.loadAutonomousSellers();
    this.loadDedicatedSellers();
    this.loadProfesionalSellers();
  }

  loadAutonomousSellers(): void {
    this.autonomousService.getAllAutonomous().subscribe((data) => {
      if (!Array.isArray(data)) {
        console.error("Error: data no es un array", data);
        return;
      }

      this.sellersAvailable = this.sellersAvailable.concat(data.filter(seller => {
        return seller && typeof seller.description === 'string' &&
               seller.description.includes(this.selectedCategory || '');
      }).map(seller => ({ ...seller, category: 'Autonomous' })));
    }, (error: any) => {
      console.error("Error al obtener los vendedores autónomos:", error);
    });
  }

  loadDedicatedSellers(): void {
    this.dedicatedService.getAllDedicated().subscribe((data) => {
      if (!Array.isArray(data)) {
        console.error("Error: data no es un array", data);
        return;
      }

      this.sellersAvailable = this.sellersAvailable.concat(data.filter(seller => {
        return seller && typeof seller.description === 'string' &&
               seller.description.includes(this.selectedCategory || '');
      }).map(seller => ({ ...seller, category: 'Dedicated' })));
    }, error => {
      console.error("Error al obtener los vendedores dedicados:", error);
    });
  }

  loadProfesionalSellers(): void {
    this.profesionalService.getAllProfessionals().subscribe((data: Professional[]) => {
      if (!Array.isArray(data)) {
        console.error("Error: data no es un array", data);
        return;
      }

      this.sellersAvailable = this.sellersAvailable.concat(data.filter(seller => {
        return seller && typeof seller.description === 'string' &&
               seller.description.includes(this.selectedCategory || '');
      }).map(seller => ({ ...seller, category: 'Profesional' })));
    }, error => {
      console.error("Error al obtener los vendedores profesionales:", error);
    });
  }

  loadRankings(): void {
    this.rankingService.getRankings().subscribe((data) => {
      this.rankings = data;
    }, error => {
      console.error("Error al obtener los rankings:", error);
    });
  }
}
