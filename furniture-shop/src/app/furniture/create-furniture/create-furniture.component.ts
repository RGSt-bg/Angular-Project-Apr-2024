import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css'],
})
export class CreateFurnitureComponent {
  categories: Category[] = [{category: '', imageCategory: '', location: ''}];
  selectedCategory: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addFurniture(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const formValue = form.value;
    if (formValue) {
      const {
        name,
        category,
        imageFurniture,
        color,
        material,
        price,
        description,
      } = formValue;

      if (name && category && imageFurniture && price && description) {
console.log(name, category, imageFurniture, color, material, price, description);
// TODO: create auth/login to work this functionality
        this.apiService
          .createFurniture(
            name,
            this.selectedCategory,
            imageFurniture,
            color,
            material,
            price,
            description,
          )
          .subscribe(() => {
            this.router.navigate(['furniture/createFurniture']);
          });
      }
    }
  }
}