import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { Furniture } from 'src/app/types/furniture';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  calledFrom: string = '';
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
    const furnitureId = this.route.snapshot.paramMap.get('furnitureId');
    const calledFrom = this.route.snapshot.paramMap.get('calledFrom');
    this.calledFrom = calledFrom!;
    this.apiService.getFurnitureDetails(furnitureId!).subscribe((furniture) => {
      this.furniture = [furniture];
    });
  }

  deleteFurniture(furnitureId: string) {
    this.apiService.deleteFurniture(furnitureId).subscribe(
        () => {
            if (this.calledFrom === 'category') {
                this.router.navigate(['/furniture/furnitureList', this.calledFrom, this.furniture[0].category]);
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

}
