import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/home']);
          alert('You are logged in successfully!');
        } else {
          // console.error('Login error:', response.message);
          alert(response.message);
        }
      },
      (error) => {
        // Network errors
        console.error('Login error:', error);
        alert('Ops! Something went wrong!');
      }
    );
  }

  // constructor(private userService: UserService, private router: Router, private errorService: ErrorService) {}

  // login(form: NgForm): void {
  //   if (form.invalid) {
  //     console.log('Invalid data in form!');
  //     return
  //   }
  //   const { email, password } = form.value;

  //   this.userService.login(email, password).subscribe({
  //     next: (res) => {
  //       this.router.navigate(['/home'])
  //     },
  //     error: (err) => {
  //       console.log(err)
  //       this.errorService.setError(err)
  //     }
  //   })
  // }
}
