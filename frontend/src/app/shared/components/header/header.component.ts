import { Component, OnInit, Input, ViewChild, HostBinding, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HeaderLoginComponent } from '../header-login/header-login.component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';
import { AuthService } from 'src/app/services/auth.service';
//import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  switchTheme = new FormControl(false)
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();

  /*@ViewChild(HeaderLoginComponent) modal!: HeaderLoginComponent;
  private modalComponent!: HeaderLoginComponent;

  openMyModal(){
    return this.modalService.open(this.modalComponent);
    this.modal.openModal();
  }*/

  title = 'Buscar tus...';
  searchTerm$ = new Subject<string>();

  onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm$.next(target.value);
  }

  private listDeliciousDishes: string[] = [
    'Samsung',
    'televisores',
    'empresas',
    'motorola',
    'zapatillas',
    'computadoras',
    'herramientas',
    'juegos',
    'notebooks',
    'notebook hp',
    'celular viejo',
    'iphone',
    'huawei',
    'depto buenos aires',
    'notebooks',
    'notebook gaming',
    'parlantes',
    'joystick',
    'herramientas',
    'juegos',
    'notebooks',
    'notebook hp',
  ];
  listFiltered: string[] = [];


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern: any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  //private passwordPattern:any = /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*[0-9]){2})\S{8,16}$/;

  formRegister!: FormGroup;
  submitted = false;



  createForm() {
    this.formRegister = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(5)]],
      apellido: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      contraseña: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.passwordPattern)]],
      confirmarContraseña: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.passwordPattern)]]
    });
  }

  constructor(
    public translationService: TranslationService,
    private fb: FormBuilder, 
    private route: Router, 
    private modal: NgbModal,
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  changeLanguage(language: string): void {
    this.translationService.use(language);
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.use(lang);
  }

  


  submitRegister() {
    this.submitted = true;
    this.route.navigate(['confirm-verification']);
    this.formRegister.reset();

  }

  /*onClick() {
    this.modal.open(ModalComponent);
  }*/

  sendProfile() {
    Swal.fire(
      'The Internet?', //msg principal
      'That thing is still around?', //msg secundario
      'error' //icono
    )
    //this.route.navigate(['profile'])
  }

  get f() {
    return this.formRegister.controls
  }

  get apellido() {
    return this.formRegister.get('apellido')
  }



  ngOnInit(): void {
    this.filterList();
    
    // Suscribirse a los cambios del estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        console.log('Estado de autenticación actualizado:', isAuthenticated);
      }
    );
    
    // Verificar estado inicial
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Método para cerrar sesión
  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire(
          '¡Sesión cerrada!',
          'Has cerrado sesión exitosamente.',
          'success'
        );
      }
    });
  }



  filterList(): void {
    this.searchTerm$.subscribe(term => {
      if(term !== ''){
        this.listFiltered = this.listDeliciousDishes
        .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
      }else{
        this.listFiltered = []
      }
     

    });


  }

  toggleSwitch(){
    this.themeService.toggleTheme();
  }


}
