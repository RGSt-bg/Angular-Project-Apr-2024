import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FurnitureRoutingModule } from './furniture-routing.module';

import { CategoriesComponent } from './categories/categories.component';
import { FurnituresComponent } from './furnitures/furnitures.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [CategoriesComponent, FurnituresComponent, CreateCategoryComponent, CreateFurnitureComponent, SearchComponent, DetailsComponent],
  imports: [CommonModule, FurnitureRoutingModule, RouterModule, FormsModule],
  exports: [CategoriesComponent, FurnituresComponent, CreateCategoryComponent, CreateFurnitureComponent],
})

export class FurnitureModule {}
console.log('furniture.module');
