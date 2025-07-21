import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() workerData: any = {
    name: 'Usuario',
    description: 'Sin descripción disponible',
    profession: 'Profesional',
    score: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
