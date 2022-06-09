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
  // constructor(private toast: NotificationService,
  //   private loadingService: LoadingService, private router: Router,
  //   private apiService: ApiService,
  //   public userService: UserService) {

  // }
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.generateDetails();
  }
  _data: any
 
  isDisabled: boolean=true;

  generateDetails() {

    this.updateForm= this.fb.group({
      productId:[''],
      productName: ['', Validators.required],
      // guarantorName: ['', Validators.required],
      // address: ['', Validators.required],
      // mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // aadharNumber: ['', Validators.required],
      // referredBy: ['', Validators.required],
      // fileUpload: [''],
      // createdBy: ['', Validators.required],
      // dateOfCreated: [moment().format()],
      // modifiedBy: ['', Validators.required],
      // dateOfModified: [moment().format()]

    })
  
  this.apiService.getProductDetails().subscribe(data => {
    this._data = data;
    console.log(this._data);
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
}
