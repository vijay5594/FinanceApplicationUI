import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormControlName, FormGroup,Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  constructor(public modalController: ModalController,
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.generateDetails();
    this.generateSignupForm();
  }
  

  
  _data: any
 
  isDisabled: boolean=true;

  generateDetails() {

    this.updateForm= this.fb.group({
      customerId:[''],
      customerName: ['', Validators.required],
      guarantorName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      aadharNumber: ['', Validators.required],
      referredBy: ['', Validators.required],
      fileUpload: [''],
      createdBy: ['', Validators.required],
      dateOfCreated: [moment().format()],
      modifiedBy: ['', Validators.required],
      dateOfModified: [moment().format()]

    })
  }

    generateSignupForm = () => {
      this.signupForm = this.fb.group({
        userName: [''],
        password: [''],
        role: ['']
      });
    this.apiService.getCustomerDetails().subscribe(data => {
      this._data = data;
      console.log(this._data);
    });
  }


updateForm:FormGroup
signupForm:FormGroup
signup() {
  console.log(this.signupForm.value, 'form values')
  this.apiService.addUser(this.signupForm.value).subscribe(data => {
    console.log(data);
    
  });
}

  updateCustomer() {
    
    this.apiService.updateCustomer(this.updateForm.value).subscribe(data => {
      console.log(data);
      this.isDisabled=true;
    });
  }
  deleteCustomer(params: any) {
    this.apiService.deleteCustomer(params).subscribe(data => {
      this.toast.success('Deleted Successfully');
      window.location.reload();
    });
  }
  validateNumber(e) {
    const keyCode = e.keyCode;  
		if (( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !=8) {
			e.preventDefault();
    }
  }
  // thisFormValid() {
  //   if (this.updateForm.valid) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  changeStatus(){
    this.isDisabled = !(this.isDisabled);
  }
  
  uploadcandidateFile = (fileChangeEvent: any) => {
    console.log(fileChangeEvent,'geetha')
    const photo = fileChangeEvent.target.files[0];
    console.log(photo,'geetha')

    const formData = new FormData();
    console.log(formData,'geetha')

    formData.append('file', photo);
    this.apiService.fileUpload(formData).subscribe((file:any)=>{
      console.log(file, 'file')

    });
  }

}
