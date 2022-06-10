import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  productDetails: any;
  
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.generateDetails();
  }

 
  isDisabled: boolean=true;

  generateDetails() {

    this.updateForm= this.fb.group({
      productId:[''],
      productName: ['', Validators.required],
      productType: ['', Validators.required],    
      productTenure: ['', Validators.required],
      numberOfCustomers: ['', Validators.required],
      price:['', Validators.required],
    })
    this.apiService.getProductDetails().subscribe(data => {
      this.productDetails = data;
      console.log(this.productDetails);
    });
  }

    updateForm:FormGroup
  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.apiService.getProductDetails().subscribe(data => {
      this.productDetails = data;
      console.log(this.productDetails, 'data')
    })
  }
  onClickAdd() {
    this.router.navigate(['/tabs/tab4']);
  }
  updateProduct() {
    
    this.apiService.updateProduct(this.updateForm.value).subscribe(data => {
      console.log(data);
      this.isDisabled=true;
    });
  }
  deleteProduct(params: any) {
    this.apiService.deleteProduct(params).subscribe(data => {
      this.toast.success('Deleted Successfully');
      window.location.reload();
    });
  }
  changeStatus(){
    this.isDisabled = !(this.isDisabled);
  }
  validateNumber(e) {
    const keyCode = e.keyCode;  
		if (( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !=8) {
			e.preventDefault();
    }
  }
}
