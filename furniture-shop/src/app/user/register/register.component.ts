import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator, matchPasswordsValidator } from 'src/app/shared/validators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator()]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const {
      username,
      email,
      passGroup: { password, rePassword } = {},
    } = this.form.value;

    // this.userService
    //   .register(username!, email!, password!, rePassword!)
    //   .subscribe(() => {
    //     this.router.navigate(['/home']);
    //   });

    this.userService.register(username!, email!, password!, rePassword!).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/home']);
          alert('You are registered successfully!');
        } else {
          // console.error('Login error:', response.message);
          alert(response.message);
        }
      },
      (error) => {
        // Network errors
        console.error('Register error:', error);
        alert('Ops! Something went wrong!');
      }
    );
  }
}
