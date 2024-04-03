import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  furnitureId: string = '';
  furniture: any = {};
  calledFrom: string = '';
  isOwner: string = '';

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const calledFrom = this.route.snapshot.paramMap.get('calledFrom');
    this.calledFrom = calledFrom || '';
    this.route.params.subscribe((params) => {
      this.furnitureId = params['furnitureId'];
      this.apiService
        .getFurnitureDetails(this.furnitureId)
        .subscribe((furniture) => {
          this.furniture = furniture;
          this.isOwner = this.furniture.isOwner;
        });
    });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  deleteFurniture() {
    this.apiService.deleteFurniture(this.furnitureId).subscribe(
      () => {
        if (this.calledFrom === 'category') {
            this.router.navigate(['/furniture/furnitureList', this.calledFrom,
            this.furniture.category,]);
        } else if (this.calledFrom === 'newProducts') {
            this.router.navigate(['/furniture/furnitureList', this.calledFrom]);
        } else {
            this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error deleting furniture: ', error);
      }
    );
  }

  editFurniture() {
    this.router.navigate([`/furniture/edit/${this.furnitureId}`], {
      queryParams: {
        calledFrom: this.calledFrom,
        editMode: true,
        furnitureId: this.furnitureId,
        name: this.furniture.name,
        category: this.furniture.category,
        imageFurniture: this.furniture.imageFurniture,
        color: this.furniture.color,
        material: this.furniture.material,
        price: this.furniture.price,
        description: this.furniture.description,
      },
    });
  }
}
