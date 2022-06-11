import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { WorkStations } from 'src/app/entities/topglove.domain.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/entities/topglove.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  workStations: Array<string> = WorkStations.data;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private userService: UserService,
    private toast: NotificationService,
    private apiService: ApiService) {
    this.generateLoginForm();
  }

  ngOnInit() {
  }

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    this.apiService.doLogin(this.loginForm.value).subscribe((data) => {
      if (data) {
        console.log(data);
        this.userService.User = data.userName;
        this.userService.Role = data.role;
        if (data.role == "operator") {
          this.userService.IsSuperUser = false;
          this.loadingService.hide();
          this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
        }
        else {
          this.userService.IsSuperUser = true;
          this.loadingService.hide();
          this.router.navigate(['/tabs/tab2'], { replaceUrl: true });
        }
      } else {
        this.toast.error('Please enter valid username');
      }
    },
      (error: any) => {
        console.log(error);
        this.loadingService.hide();
        this.toast.error('Unable to validate user. Please try agian after sometime.');
      });
    }
  }