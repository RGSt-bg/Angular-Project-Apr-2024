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
    this.route.params
      .pipe(
        switchMap((params) => {
          const calledFrom = params['calledFrom'];
          const category = params['category'];
console.log('ngOnInit -> calledFrom, category: ', calledFrom, category);
          if (calledFrom && category) {
            return this.apiService.getFurnitureByCategory(category);
          } else {
            return [];
          }
        })
      )
      .subscribe((furniture) => {
        this.furniture = furniture;
console.log('ngOnInit -> this.furniture: ',this.furniture);
      });
  }
}
