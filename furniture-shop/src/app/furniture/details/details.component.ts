import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  furnitureId: string = '';
  furniture: any = {};

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.furnitureId = params['furnitureId'];
      this.apiService.getFurnitureDetails(this.furnitureId).subscribe((furniture) => {
        this.furniture = furniture;
      });
    });
  }

  deleteFurniture() {
    this.apiService.deleteFurniture(this.furnitureId).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error deleting furniture: ', error);
      }
    );
  }

  editFurniture() {
    this.router.navigate(['/create-furniture'], {
      queryParams: {
        editMode: true,
        furnitureId: this.furnitureId,
        name: this.furniture.name,
        category: this.furniture.category,
        imageFurniture: this.furniture.imageFurniture,
        color: this.furniture.color,
        material: this.furniture.material,
        price: this.furniture.price,
        description: this.furniture.description
      }
    });
  }
}
