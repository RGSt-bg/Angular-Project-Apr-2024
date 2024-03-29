import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';
import { Furniture } from 'src/app/types/furniture';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css'],
})
export class CreateFurnitureComponent implements OnInit {
  categories: Category[] = [{ category: '', imageCategory: '', location: '' }];
  selectedCategory: string = '';
  isEditMode: boolean = false;
  furnitureId: string = '';
  furniture: Furniture = {
    name: '',
    category: '',
    imageFurniture: '',
    color: '',
    material: '',
    price: 0,
    description: '',
    _id: '',
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.route.queryParams.subscribe((params) => {
      if (params['editMode']) {
        this.isEditMode = true;
        this.furniture = {
          name: params['name'] || '',
          category: params['category'] || '',
          imageFurniture: params['imageFurniture'] || '',
          color: params['color'] || '',
          material: params['material'] || '',
          price: params['price'] || 0,
          description: params['description'] || '',
          _id: params['furnitureId'] || '',
        };
      }
    });
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const formValue = form.value;
    if (this.isEditMode) {
      this.editFurniture(formValue);
    } else {
      this.addFurniture(formValue);
    }
  }

  addFurniture(formData: any) {
    const {
      name,
      category,
      imageFurniture,
      color,
      material,
      price,
      description,
    } = formData;

    if (name && category && imageFurniture && price && description) {
      this.apiService
        .createFurniture(
          name,
          category,
          imageFurniture,
          color,
          material,
          price,
          description
        )
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    }
  }

  editFurniture(formData: any) {
    const {
      name,
      category,
      imageFurniture,
      color,
      material,
      price,
      description,
    } = formData;

    if (
      name &&
      category &&
      imageFurniture &&
      price &&
      description &&
      this.furnitureId
    ) {
      this.apiService
        .editFurniture(
          this.furnitureId,
          name,
          category,
          imageFurniture,
          color,
          material,
          price,
          description
        )
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    }
  }
}
