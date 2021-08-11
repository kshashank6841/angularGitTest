import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import forRentCoord from 'src/assets/Json/forRentCoord.json';
import forSellCoord from 'src/assets/Json/forSellCoord.json';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit
{
  images:any;
  id: any;
  name: any;
  lat: any;
  lon: any;
  cost: any;
  imgLocation: any;
  buildingClass: any;
  squareFeet: any;
  zoning: any;
  YearBill: any;
  market: any;
  suitNumber: any;
  submarket: any;
  tenancy: any;
  propertyType: any;

  constructor(private shareData: ShareDataService, private router: Router) { }

  ngOnInit(): void
  {
    this.shareData.on<any>().subscribe(data =>
    {
      this.id = data.id;
      this.name = data.name;
      this.lat = data.Lat;
      this.lon = data.Lon;
      this.cost = data.cost;
      this.imgLocation = data.houseImage;
      this.images=data.houseImage;
      this.buildingClass = data.buildingClass;
      this.squareFeet = data.squareFeet;
      this.zoning = data.zoning;
      this.YearBill = data.YearBill;
      this.market = data.market;
      this.suitNumber = data.suitNumber;
      this.submarket = data.submarket;
      this.tenancy = data.tenancy;
      this.propertyType = data.propertyType;

      console.log(`${this.id}  , ${this.name}, ${this.lat}, ${this.lon},${this.cost},${this.imgLocation}`);
    })

  }
 
}
