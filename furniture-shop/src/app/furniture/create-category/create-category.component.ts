import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  constructor( private apiService: ApiService, private router: Router ) {}

  addCategory(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { category, imageCategory } = form.value;
    this.apiService.createCategory(category, imageCategory).subscribe(() => {
      this.router.navigate(['/furniture/createCategory']);
      // this.router.navigate(['/furniture/createCategory', {category, imageCategory}]);
    });
  }
}
