import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-section-last-admission',
  templateUrl: './section-last-admission.component.html',
  styleUrls: ['./section-last-admission.component.scss'],
})
export class SectionLastAdmissionComponent implements OnInit {
  // arrayProducts: any = [
  //   {
  //     title: 'Ganar $1000',
  //     image: '../../../assets/img/product.png',
  //   },
  //   {
  //     title: 'Ganar $500',
  //     image: '../../../assets/img/product-2.png',
  //   },
  //   {
  //     title: 'Ganar $800',
  //     image: '../../../assets/img/product-3.png',
  //   },
  //   {
  //     title: 'Ganar $420',
  //     image: '../../../assets/img/product-4.png',
  //   },
  //   {
  //     title: 'Ganar $1000',
  //     image: '../../../assets/img/product.png',
  //   },
  //   {
  //     title: 'Ganar $500',
  //     image: '../../../assets/img/product-2.png',
  //   },
  // ];

 products: any[] = [];
  chunkedProducts: any[][] = [];

   constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

loadProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (response) => {
      console.log('Respuesta del servidor:', response);

      
      this.products = response?.response?.data?.products || []; 
      this.chunkedProducts = this.chunkArray(this.products, 4);

      console.log('Productos cargados:', this.products);
    },
    error: (error) => {
      console.error('Error al cargar productos:', error);
    }
  });
}


  private chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
