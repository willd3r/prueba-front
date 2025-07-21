import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/api/payments';

  processPayment(paymentData: any) {
    return axios.post(this.apiUrl, paymentData);
  }



  constructor() { }
}
