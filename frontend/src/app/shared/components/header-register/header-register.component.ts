import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertasService } from 'src/app/services/alertas.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService, RegisterRequest } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-register',
  templateUrl: './header-register.component.html',
  styleUrls: ['./header-register.component.scss']
})
export class HeaderRegisterComponent implements OnInit {

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
      nombre: ["", [Validators.required,Validators.minLength(5)]],
      apellido: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      contraseña: ["", [Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(this.passwordPattern)]],
      confirmarContraseña: ["", [Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(this.passwordPattern)]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contraseña');
    const confirmPassword = form.get('confirmarContraseña');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword && confirmPassword.errors) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  constructor(
    private fb: FormBuilder, 
    private route: Router, 
    private modal: NgbModal,
    private alertaService: AlertasService,
    private authService: AuthService,
    private registerService: RegisterService
  ) { 
    this.createForm();
  }


 
  submitRegister(){
    this.submitted = true;

    if(!this.formRegister.valid){
      this.alertaService.showError('Error', 'Por favor, verifica que todos los campos sean correctos');
      return;
    }

    // Verificar que las contraseñas coincidan
    if (this.formRegister.value.contraseña !== this.formRegister.value.confirmarContraseña) {
      this.alertaService.showError('Error', 'Las contraseñas no coinciden');
      return;
    }

    this.isLoading = true;

    const userData: RegisterRequest = {
      nombre: this.formRegister.value.nombre,
      apellido: this.formRegister.value.apellido,
      email: this.formRegister.value.email,
      contraseña: this.formRegister.value.contraseña,
      confirmarContraseña: this.formRegister.value.confirmarContraseña
    };

    // Guardar los datos del usuario en sessionStorage para usarlos en la verificación
    sessionStorage.setItem('pendingRegistration', JSON.stringify(userData));

    this.registerService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          // Código de verificación enviado exitosamente
          this.alertaService.showSuccess('¡Código enviado!', 'Revisa tu email para verificar tu cuenta');
          this.route.navigate(['/confirm-verification']);
          this.formRegister.reset();
        } else {
          // Error al enviar código
          this.alertaService.showError('Error', response.message || 'Error al enviar código de verificación');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en registro:', error);
        
        // Manejar diferentes tipos de errores
        if (error.status === 409) {
          this.alertaService.showError('Error', 'El email ya está registrado');
        } else if (error.status === 400) {
          this.alertaService.showError('Error', 'Datos inválidos. Verifica la información');
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
  
  // Getter para verificar si las contraseñas coinciden
  get passwordsMatch(): boolean {
    const password = this.formRegister.get('contraseña')?.value;
    const confirmPassword = this.formRegister.get('confirmarContraseña')?.value;
    return password === confirmPassword;
  }

  ngOnInit(): void {
    
  }
}
