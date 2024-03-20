import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FurnitureRoutingModule } from './furniture-routing.module';

import { CategoriesComponent } from './categories/categories.component';
import { FurnituresComponent } from './furnitures/furnitures.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';

@NgModule({
  declarations: [CategoriesComponent, FurnituresComponent, CreateCategoryComponent, CreateFurnitureComponent],
  imports: [CommonModule, RouterModule, FurnitureRoutingModule],
  exports: [CategoriesComponent, FurnituresComponent, CreateCategoryComponent, CreateFurnitureComponent],
})
export class FurnitureModule {}
