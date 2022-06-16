import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {

  constructor(public notificationService: NotificationService,
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.generatePaymentForm();

  }
  currentUser: string = localStorage.getItem('userName')
  superUser: string = localStorage.getItem('isSuperUser')
  role: string = localStorage.getItem('Role')
  // productCustomerId :any=localStorage.getItem('productCustomerId')
  paymentForm: FormGroup

  generatePaymentForm = () => {
    this.paymentForm = this.fb.group({
      //paymentId:[''],
      productCustomerId:[''],
      paymentType: [''],
      paymentDate: [moment().format()],
      paidAmount: [''],
      collectedBy:[this.currentUser],

    });
  }
  pay() {
    console.log(this.paymentForm.value, 'form values')
    this.apiService.insertPayment(this.paymentForm.value).subscribe(data => {
      this.notificationService.success('Paid successfully')
      console.log(data);
    });
  }
}
