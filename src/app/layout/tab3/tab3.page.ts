import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, WorkStations } from 'src/app/entities/topglove.domain.model';
import { saveAs } from 'file-saver';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Size, TypeOfFormers } from '../../entities/topglove.domain.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {



  constructor(private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService,
    public fb: FormBuilder,
    public notificationService: NotificationService
  ) {
    this.generateLoginForm();


  }



  loginForm: FormGroup

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      productId:[''],
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
    });
  }

  thisFormValid() {
    if (this.loginForm.valid) {
      return true
    } else {
      return false
    }
  }
  save() {
    console.log(this.loginForm.value, 'form values')
    this.apiService.insertCustomer(this.loginForm.value).subscribe(data => {
      console.log(data);
      this.notificationService.success('Customer details saved successfully')
    });

  }
  validateNumber(e) {
    const keyCode = e.keyCode;  
		if (( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !=8) {
			e.preventDefault();
    }
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
