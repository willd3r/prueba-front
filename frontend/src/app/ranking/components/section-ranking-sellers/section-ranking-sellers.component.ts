import { Component, OnInit } from '@angular/core';
import { AutonomousService, Autonomous } from 'src/app/services/autonomous.service';
import { DedicatedService, Dedicated } from 'src/app/services/dedicated.service';
import { ProfessionalService, Professional } from 'src/app/services/profesional.service';

@Component({
  selector: 'app-section-ranking-sellers',
  templateUrl: './section-ranking-sellers.component.html',
  styleUrls: ['./section-ranking-sellers.component.scss'],
})
export class SectionRankingSellersComponent implements OnInit {
  selfemployedActive: boolean = false;
  dedicatedActive: boolean = false;
  professionalsActive: boolean = false;
  sellersRanked: (Autonomous | Dedicated | Professional)[] = [];
  allSellers: (Autonomous | Dedicated | Professional)[] = [];

  constructor(
    private autonomousService: AutonomousService,
    private dedicatedService: DedicatedService,
    private professionalService: ProfessionalService
  ) {}

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(): void {
    this.autonomousService.getAutonomousRanking().subscribe((autonomousData: Autonomous[]) => {
      this.dedicatedService.getDedicatedRanking().subscribe((dedicatedData: Dedicated[]) => {
        this.professionalService.getAllProfessionals().subscribe((professionalData: Professional[]) => {
          this.allSellers = [...autonomousData, ...dedicatedData, ...professionalData];
          this.filterSellers('Autonomos');
        }, error => {
          console.error('Error al obtener el ranking de profesionales:', error);
        });
      }, error => {
        console.error('Error al obtener el ranking de dedicados:', error);
      });
    }, error => {
      console.error('Error al obtener el ranking de autónomos:', error);
    });
  }

  filterSellers(type: string): void {
    this.selfemployedActive = type === 'Autonomos';
    this.dedicatedActive = type === 'Dedicados';
    this.professionalsActive = type === 'Profesionales';

    this.sellersRanked = this.allSellers.filter(seller => {
      if (type === 'Autonomos') {
        return (seller as Autonomous).description ? (seller as Autonomous).description.includes(type) : false;
      } else if (type === 'Dedicados') {
        return (seller as Dedicated).description ? (seller as Dedicated).description.includes(type) : false;
      } else if (type === 'Profesionales') {
        return (seller as Professional).profession ? (seller as Professional).profession.includes(type) : false;
      }
      return false;
    });
  }
}
