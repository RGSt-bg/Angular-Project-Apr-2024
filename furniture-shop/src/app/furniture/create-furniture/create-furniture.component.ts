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
  calledFrom: string = '';
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
      if (!this.isEmptyObject(params)) {
        if (params['editMode']) {
          this.isEditMode = true;
          this.calledFrom = params['calledFrom'] || '';
          this.furniture = {
            _id: params['furnitureId'] || '',
            name: params['name'] || '',
            category: params['category'] || '',
            imageFurniture: params['imageFurniture'] || '',
            color: params['color'] || '',
            material: params['material'] || '',
            price: params['price'] || 0,
            description: params['description'] || '',
          };
          this.selectedCategory = params['category'] || '';
          this.furnitureId = params['furnitureId'] || '';
        }
        this.calledFrom = params['calledFrom'] || '';
      }
    });
    // if (this.furniture.name && 
    //     this.furniture.category && 
    //     this.furniture.imageFurniture && 
    //     this.furniture.price && 
    //     this.furniture.description) {
    //   this.apiService
    //     .editFurniture(
    //       this.furniture._id,
    //       this.furniture.name,
    //       this.furniture.category,
    //       this.furniture.imageFurniture,
    //       this.furniture.color,
    //       this.furniture.material,
    //       this.furniture.price,
    //       this.furniture.description
    //     )
    //     .subscribe(() => {
    //       if (this.calledFrom === 'category') {
    //         this.router.navigate([
    //           '/furniture/furnitureList', this.calledFrom, this.furniture.category,
    //         ]);
    //       } else if (this.calledFrom === 'newProducts') {
    //         this.router.navigate(['/furniture/furnitureList', this.calledFrom]);
    //       } else {
    //         this.router.navigate(['/home']);
    //       }
    //     });
    // }
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
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
          if (this.calledFrom === 'category') {
            this.router.navigate([
              '/furniture/furnitureList', this.calledFrom, this.furniture.category,
            ]);
          } else if (this.calledFrom === 'newProducts') {
            this.router.navigate(['/furniture/furnitureList', this.calledFrom]);
          } else {
            this.router.navigate(['/home']);
          }
        });
    }
  }

  editFurniture(formData: any) {
    const { name, category, imageFurniture, color,
            material, price, description, } = formData;

    if (name && category && imageFurniture &&
        price && description && this.furnitureId) {
      this.apiService.editFurniture(
          this.furnitureId, name, category, imageFurniture,
          color, material, price, description)
        .subscribe(() => {
          if (this.calledFrom === 'category') {
            this.router.navigate([
              '/furniture/furnitureList', this.calledFrom, this.furniture.category,
            ]);
          } else if (this.calledFrom === 'newProducts') {
            this.router.navigate(['/furniture/furnitureList', this.calledFrom]);
          } else {
            this.router.navigate(['/home']);
          }
        });
    }
  }
}
