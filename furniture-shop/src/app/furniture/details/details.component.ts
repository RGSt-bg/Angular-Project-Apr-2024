import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Furniture } from 'src/app/types/furniture';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
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

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const furnitureId = this.route.snapshot.paramMap.get('furnitureId');
    this.api.getFurnitureDetails(furnitureId!).subscribe((furniture) => {
      this.furniture = [furniture];
    });
  }
}
