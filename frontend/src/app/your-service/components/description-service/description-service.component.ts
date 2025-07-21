import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-description-service',
  templateUrl: './description-service.component.html',
  styleUrls: ['./description-service.component.scss']
})
export class DescriptionServiceComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  precioMinimo: number | null = null;
  precioMaximo: number | null = null;
  diferencia: number | null = null;
  tarifaServicio: number | null = null;

  calcularDiferencia() {
    if (this.precioMinimo !== null && this.precioMaximo !== null) {
      this.diferencia = this.precioMaximo - this.precioMinimo;
      this.tarifaServicio = (this.diferencia * 10) / 100;

    } else {
      this.diferencia = null;
    }
  }

   // Variables para almacenar las imágenes
  imagePreview1: string | null = null;
  imagePreview2: string | null = null;
  imagePreview3: string | null = null;
  imagePreview4: string | null = null;

  // Lógica para previsualizar la imagen seleccionada
  previewImage(event: any, imageNumber: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        // Actualizar la vista previa dependiendo del número de la imagen
        switch (imageNumber) {
          case 1:
            this.imagePreview1 = imageUrl;
            break;
          case 2:
            this.imagePreview2 = imageUrl;
            break;
          case 3:
            this.imagePreview3 = imageUrl;
            break;
          case 4:
            this.imagePreview4 = imageUrl;
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  }

    // Variable para almacenar la vista previa del video
  videoPreview: string | null = null;

  // Lógica para previsualizar el video seleccionado
  previewVideo(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de video.");
    }
  }



}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
