import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { TranslationService } from 'src/app/services/translation.service';
import { TranslateService } from '@ngx-translate/core';






@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories = [
    {
      name: 'Electronics',
      subcategories: ['Mobile Phones', 'Laptops', 'Cameras']
    },
    {
      name: 'Home Appliances',
      subcategories: ['Refrigerators', 'Microwaves', 'Washing Machines']
    },
    {
      name: 'Books',
      subcategories: ['Fiction', 'Non-fiction', 'Comics']
    },
    // {
    //   name: 'Envios',
    //   subcategories: ['Fiction', 'Non-fiction', 'Comics']
    // },

  ];

  selectedLang = 'es'

  //arrayLang = ['Español', 'Ingles','Spanish', 'English']
  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
    // //translate.addLangs([]);
    // //translate.setDefaultLang('en');
    // this.translate.setDefaultLang(this.selectedLang);
    // this.translate.use(this.selectedLang)

    translate.setDefaultLang(this.selectedLang);
    translate.use(this.selectedLang) // Establece el idioma por defecto

    // Cambia el idioma basado en la preferencia del usuario
    const browserLang = translate.getBrowserLang();
    if (browserLang) {
      translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
    }


  }

  changeLanguage(language: string) {
    this.translate.use(language)
  }

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Asegúrate de que sea un `HTMLSelectElement`
    const lang = selectElement.value; // Accede a `value` de forma segura
    this.translate.use(lang);
  }

  toggleMode(){

  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Añadir método para manejar el touch/hover
  onItemInteraction(event: Event) {
    const element = event.target as HTMLElement;
    if (element.classList.contains('dropdown-item')) {
      // Mantener todos los submenús ocultos - solo mostrar opciones principales
      this.closeAllSubmenus();
      
      this.renderer.addClass(element, 'visited');
      
      // Cambiar color de texto temporalmente
      this.renderer.setStyle(element, 'color', '#236bd8');
      
      // Restaurar color después de un momento
      setTimeout(() => {
        this.renderer.setStyle(element, 'color', '#333');
      }, 200);
    }
  }

  // Método para cerrar otros submenús
  private closeOtherSubmenus(currentElement: HTMLElement) {
    const allSubmenus = document.querySelectorAll('.dropdown-submenu');
    allSubmenus.forEach(submenu => {
      if (submenu !== currentElement.nextElementSibling) {
        this.renderer.setStyle(submenu, 'display', 'none');
      }
    });
  }

  ngOnInit(): void {
    // Añadir listeners para eventos touch y mouse
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      this.renderer.listen(item, 'touchstart', (event) => this.onItemInteraction(event));
      this.renderer.listen(item, 'mouseenter', (event) => this.onItemInteraction(event));
    });

    // Cerrar submenús cuando se hace clic fuera del dropdown
    this.renderer.listen('document', 'click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-menu')) {
        this.closeAllSubmenus();
      }
    });
  }

  // Método para cerrar todos los submenús
  private closeAllSubmenus() {
    const allSubmenus = document.querySelectorAll('.dropdown-submenu');
    allSubmenus.forEach(submenu => {
      this.renderer.setStyle(submenu, 'display', 'none');
    });
  }



}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}


