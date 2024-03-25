import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Furniture } from 'src/app/types/furniture';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-furnitures',
  templateUrl: './furnitures.component.html',
  styleUrls: ['./furnitures.component.css'],
})
export class FurnituresComponent implements OnInit {
  furniture: Furniture[] = [
    {
      name: '',
      category: '',
      imageFurniture: '',
      color: '',
      material: '',
      price: 0,
      description: '',
      _id: '',
    },
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
console.log('Furnitures component. loaded');
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        const category = params.get('category');
        if (category) {
          return this.apiService.getFurnitureByCategory(category);
        } else {
          return [];
        }
      })
    ).subscribe((furniture) => {
      this.furniture = furniture;
    });
  }
}
