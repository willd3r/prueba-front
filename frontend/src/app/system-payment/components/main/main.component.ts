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
    userId: 'user123'
  };

  onPaymentMethodChange(method: string) {
    this.paymentData.method = method;
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
  }

}
