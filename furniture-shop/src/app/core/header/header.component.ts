import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  logout() {
    this.userService.logout().subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/home']);
          alert('You are logged off successfully!');
        } else {
          // console.error('Logout error:', response.message);
          alert(response.message);
        }
      },
      (error) => {
        // Network errors
        console.error('Logout error:', error);
        alert('Ops! Something went wrong!');
      }
    );
  }
}
