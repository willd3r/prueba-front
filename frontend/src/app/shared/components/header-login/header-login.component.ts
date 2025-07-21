import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import{ NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertasService } from 'src/app/services/alertas.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService, LoginRequest } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {



   /*@ViewChild(HeaderLoginComponent) modal!: HeaderLoginComponent;
  private modalComponent!: HeaderLoginComponent;

  openMyModal(){
    return this.modalService.open(this.modalComponent);
    this.modal.openModal();
  }*/


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern: any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  //private passwordPattern:any = /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*[0-9]){2})\S{8,16}$/;

  formRegister! : FormGroup;
  submitted = false;
  isLoading = false;



  createForm() {
    this.formRegister = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      contraseña: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  constructor(
    private fb:FormBuilder, 
    private route:Router, 
    private modal: NgbModal, 
    private alertaService: AlertasService,
    private authService: AuthService,
    private loginService: LoginService
  ) {
    this.createForm();
  }





  submitRegister(){
    console.log('🔍 HeaderLoginComponent - submitRegister llamado');
    console.log('🔍 HeaderLoginComponent - formRegister.value:', this.formRegister.value);
    console.log('🔍 HeaderLoginComponent - formRegister.valid:', this.formRegister.valid);
    
    // Logs detallados de validaciones
    console.log('🔍 HeaderLoginComponent - Email errors:', this.formRegister.get('email')?.errors);
    console.log('🔍 HeaderLoginComponent - Contraseña errors:', this.formRegister.get('contraseña')?.errors);
    console.log('🔍 HeaderLoginComponent - Email valid:', this.formRegister.get('email')?.valid);
    console.log('🔍 HeaderLoginComponent - Contraseña valid:', this.formRegister.get('contraseña')?.valid);
    console.log('🔍 HeaderLoginComponent - Email length:', this.formRegister.value.contraseña?.length);
    
    this.submitted = true;

    if(!this.formRegister.valid){
      console.log('❌ HeaderLoginComponent - Formulario inválido');
      this.alertaService.showError('Error', 'Por favor, verifica que los datos sean correctos');
      return;
    }

    console.log('✅ HeaderLoginComponent - Formulario válido, procediendo con login');
    this.isLoading = true;

    const credentials: LoginRequest = {
      email: this.formRegister.value.email,
      contraseña: this.formRegister.value.contraseña
    };

    console.log('🔍 Frontend - Datos de login a enviar:', credentials);
    console.log('🔍 Frontend - Email:', credentials.email);
    console.log('🔍 Frontend - Contraseña:', credentials.contraseña);

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('✅ Frontend - Respuesta exitosa:', response);
        
        if (response.success && response.token && response.user) {
          // Login exitoso
          this.authService.login(response.token, response.user);
          this.alertaService.showSuccess('¡Inicio de sesión exitoso!', 'Bienvenido de vuelta');
          this.route.navigate(['/home']);
          this.formRegister.reset();
        } else {
          // Login fallido
          console.log('❌ Frontend - Login fallido:', response);
          this.alertaService.showError('Error', response.message || 'Credenciales incorrectas');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Frontend - Error en login:', error);
        console.error('❌ Frontend - Error status:', error.status);
        console.error('❌ Frontend - Error message:', error.message);
        console.error('❌ Frontend - Error response:', error.response?.data);
        
        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          this.alertaService.showError('Error', 'Credenciales incorrectas');
        } else if (error.status === 0) {
          this.alertaService.showError('Error', 'No se puede conectar con el servidor. Verifica tu conexión.');
        } else {
          this.alertaService.showError('Error', 'Ocurrió un error inesperado. Intenta nuevamente.');
        }
      }
    });
  }

  /*onClick() {
    this.modal.open(ModalComponent);
  }*/

  sendProfile(){
    Swal.fire(
      'The Internet?', //msg principal
      'That thing is still around?', //msg secundario
      'error' //icono
    )
    //this.route.navigate(['profile'])
  }

  get f(){
    return this.formRegister.controls
  }

  get apellido(){
    return this.formRegister.get('apellido')
  }



  ngOnInit(): void {

  }



}
