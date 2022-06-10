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

doLogin()
{
console.log(this.loginForm.value, 'form values')
    this.apiService.doLogin(this.loginForm.value).subscribe((data)=> {

    if(data.username&&data.password)
    {
      this.router.navigate(['/tabs/tab3'], { replaceUrl: true });
    }
    else
    {
      this.toast.error('Please enter valid username'); 
    }

});
}
}
//   doLogin = () => {
//     if (this.loginForm.dirty && this.loginForm.valid) {
//       const user: string = this.loginForm.value.userName.toLowerCase();
//       const workStation: string = this.loginForm.value.workStation.toLowerCase();

//       // this.userService.WorkStation = workStation;
//       // this.userService.User = user;
//       // this.userService.IsSuperUser = false;
//       // this.router.navigate(['/tabs'], { replaceUrl: true });

//       this.loadingService.show();
//       this.apiService.doLogin({ userId: user }).subscribe((res: User | null) => {
//         this.loadingService.hide();
//         if (res) {
//           this.userService.User = res.userId;
//           this.userService.WorkStation = workStation;
//           if (res.isSuperUser) {
//             this.userService.IsSuperUser = true;
//             this.router.navigate(['/tabs/tab3'], { replaceUrl: true });
//           }
//           else {
//             this.userService.IsSuperUser = false;
//             this.router.navigate(['/tabs'], { replaceUrl: true });
//           }
//         } else {
//           this.toast.error('Please enter valid username');
//         }
//       }, (error: any) => {
//         console.log(error);
//         this.loadingService.hide();
//         this.toast.error('Unable to validate user. Please try agian after sometime.');
//       });
//     }
//   }
// }
