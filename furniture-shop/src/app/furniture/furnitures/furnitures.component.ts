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
  isNewTitle: string = '';
  isNew: string = '';
  noFurnitures: string = '';
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
          if (calledFrom && category) {
            this.setMessages(calledFrom, category);
            return this.apiService.getFurnitureByCategory(category);
          } else {
            return [];
          }
        })
      )
      .subscribe((furniture) => {
        this.furniture = furniture;
      });
  }

  setMessages(calledFrom: string, category: string) {
    if (calledFrom === 'newProducts') {
      this.isNew =
        'Here you can find our NEW furnitures - elegant, comfortable, functional ...';
      this.noFurnitures = 'Sorry, there are no new furnitures!';
      this.isNewTitle = 'New Furnitures';
    } else if (calledFrom === 'search') {
      this.isNew = 'The furniture that meets your criteria ...';
      this.noFurnitures =
        'Sorry, there are no furnitures that meets your criteria!';
      this.isNewTitle = 'Found Furnitures';
    } else if (calledFrom === 'category') {
      this.isNew = 'The furnitures by category ...';
      this.noFurnitures =
        'Sorry, there are no furnitures in this category yet!';
      this.isNewTitle = `${category}`;
    } else {
      this.isNew =
        'Here you can find our furnitures - elegant, comfortable, functional ...';
      this.noFurnitures = 'Sorry, there are no furnitures!';
      this.isNewTitle = 'Our Furnitures';
    }
  }
}
