import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  paymentData = {
    amount: 0,
    method: '',
    userId: 'user123',
    taxes: 0,
    total: 0
  };

  onPaymentMethodChange(method: string) {
    this.paymentData.method = method;
  }

   // Método para calcular el 5% de impuestos y el total a pagar
  calculateTaxes() {
    this.paymentData.taxes = this.paymentData.amount * 0.05;
    this.paymentData.total = this.paymentData.amount + this.paymentData.taxes;
  }

  processPayment() {
    this.paymentService.processPayment(this.paymentData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }


  panelOpenState = false;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
     this.calculateTaxes();
  }

}
