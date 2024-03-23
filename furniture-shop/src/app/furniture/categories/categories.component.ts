import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] | null = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
