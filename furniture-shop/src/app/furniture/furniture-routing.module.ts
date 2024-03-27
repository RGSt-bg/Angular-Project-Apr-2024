import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { FurnituresComponent } from './furnitures/furnitures.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'furniture/categories', component: CategoriesComponent },
  { path: 'furniture/createCategory', component: CreateCategoryComponent },
  { path: 'furniture/createFurniture', component: CreateFurnitureComponent },
  { path: 'furniture/furnitureList/:calledFrom/:category', component: FurnituresComponent },
  { path: 'furniture/furnitureList/:calledFrom', component: FurnituresComponent },
  { path: 'furniture/search/:calledFrom/:searchString', component: FurnituresComponent },
  { path: 'furniture/details/:furnitureId', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FurnitureRoutingModule { }
