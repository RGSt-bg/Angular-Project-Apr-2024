import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  // @ViewChild('categoryForm') categoryForm: NgForm | undefined; //TODO: reset form

  constructor( private apiService: ApiService, private router: Router ) {}

  addCategory(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { category, imageCategory } = form.value;
    this.apiService.createCategory(category, imageCategory).subscribe(() => {
      // this.categoryForm?.reset(); //TODO: reset form
      this.router.navigate(['furniture/createCategory']);
    });
  }
}
