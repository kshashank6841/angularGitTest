import { Component, OnInit} from '@angular/core';
import forRentCoord from 'src/assets/Json/forRentCoord.json';
import forSellCoord from 'src/assets/Json/forSellCoord.json';

import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { ShareDataService } from '../share-data.service';
import { Router } from '@angular/router';
import ForRentCoord from 'src/assets/Json/forRentCoord.json';
import ForSellCoord from 'src/assets/Json/forSellCoord.json';
import { Store } from '@ngrx/store';

import { filter } from '../state/property.actions';

declare function twoInputRange(): [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
  

export class DashboardComponent implements OnInit
{
  showHideSidebarMenu:boolean= true;

  map: any;
  location: any;
  chicago: any;
  vectorSource: any;
  vectorLayer: any;
  rasterLayer: any;
  london: any;
  madrid: any;
  modify: any;
  target: any;
  elements: any;
  locationsObject: any[] = [];
  popups: any;
  positioning: any;
  message: any;
  userName: any;
  bgcolors: any = 'green';
  width: any;
  mapStyle: any;
  iconStyle: any;
  longitutde: any;
  latitude: any;

  propertyTypeColor1 = 'white';
  propertyTypeColor2: any;
  propertyTypeColor3 :any;
  
showOnA1: boolean = true;
 showOnA2: boolean = false;
 showOnA3: boolean = false;
ifClicked=false;

plus=true;
tick=false;
  makeVisible1: boolean = false;
  makeVisible2: boolean = false;
  makeVisible3: boolean = false;
  makeVisible4: boolean = false;
  down44: boolean = true;
  up44: boolean = false;


  hide = true;
  show = false;
  applyStyle: any;

  boxStyle1: any = "background-color:white;";
  boxStyle2: any;
  boxStyle3: any;
  boxStyle4: any;
  boxStyle4plus: any;

  boxStyle11: any = "background-color:white;";
  boxStyle22: any;
  boxStyle33: any;
  boxStyle44: any;
  boxStyle44plus: any;

  bedroom:any=1;
  bathroom: any=1;
  minPriceRange: any = 10;
  maxPriceRange: any = 90;
  filterData: any;
  static filteredData: any;
  
  constructor(private shareData: ShareDataService, private router: Router, private store: Store<{ propertyReducer: { property: any } }>)
  {

  }
 

  ngOnInit(): void
  {
    this.showDiv1();
 
    console.log(`changing...`);

    this.shareData.on<any>().subscribe(data =>
    {
      this.message = data.img;
      this.userName = data.name;
    })
   
    this.initMap();
    var upd = setInterval(function ()
    {
      window.dispatchEvent(new Event('resize'));
      clearInterval(upd)
    }, 0)
    console.log(`${this.message}`);
 
  }

 
  ngAfterViewChecked(){
    var range:number[] = twoInputRange();
   // console.log(`..${range.toString()}...@@@.${range}`);
    this.minPriceRange = range[0];
    this.maxPriceRange = range[1];
 
   // console.log(`..${this.minPriceRange}...@@@.${this.maxPriceRange}`);
  }

  ngAfterContentInit()
  {
    
  }


  boxClicked1()
  {
    this.boxStyle1 = "background-color:white;";
    this.boxStyle2 = "";
    this.boxStyle3 = "";
    this.boxStyle4 = "";
    this.boxStyle4plus = "";
    this.bathroom = "1";
  }

  boxClicked2()
  {
    this.boxStyle1 = "";
    this.boxStyle2 = "background-color:white;";
    this.boxStyle3 = "";
    this.boxStyle4 = "";
    this.boxStyle4plus = "";
    this.bathroom = "2";
  }
  boxClicked3()
  {
    this.boxStyle1 = "";
    this.boxStyle2 = "";
    this.boxStyle3 = "background-color:white;";
    this.boxStyle4 = "";
    this.boxStyle4plus = "";
    this.bathroom = "3";
  }
  boxClicked4()
  {
    this.boxStyle1 = "";
    this.boxStyle2 = "";
    this.boxStyle3 = "";
    this.boxStyle4 = "background-color:white;";
    this.boxStyle4plus = "";
    this.bathroom = "4";
  }
  boxClicked4plus()
  {
    this.boxStyle1 = "";
    this.boxStyle2 = "";
    this.boxStyle3 = "";
    this.boxStyle4 = "";
    this.boxStyle4plus = "background-color:white;";
    this.bathroom ="4+";
  }

  boxClicked11()
  {
    this.boxStyle11 = "background-color:white;";
    this.boxStyle22 = "";
    this.boxStyle33 = "";
    this.boxStyle44 = "";
    this.boxStyle44plus = "";
    this.bedroom = "1";
  }
  boxClicked22()
  {
    this.boxStyle11 = "";
    this.boxStyle22 = "background-color:white;";
    this.boxStyle33 = "";
    this.boxStyle44 = "";
    this.boxStyle44plus = "";
    this.bedroom = "2";
  }
  boxClicked33()
  {
    this.boxStyle11 = "";
    this.boxStyle22 = "";
    this.boxStyle33 = "background-color:white;";
    this.boxStyle44 = "";
    this.boxStyle44plus = "";
    this.bedroom = "3";
  }
  boxClicked44(){
    this.boxStyle11 = "";
    this.boxStyle22 = "";
    this.boxStyle33 = "";
    this.boxStyle44 = "background-color:white;";
    this.boxStyle44plus = "";
    this.bedroom = "4";
  }
  boxClicked44plus()
  {
    this.boxStyle11 = "";
    this.boxStyle22 = "";
    this.boxStyle33 = "";
    this.boxStyle44 = "";
    this.boxStyle44plus = "background-color:white;";
    this.bedroom = "4+";
  }


  goToProprtyDetailsPage()
  {
    
   
    // console.log(`${}`);
    ForRentCoord.forEach((element: { id: number, name: string, Lat: number, Lon: number, cost: string, houseImage: string }) =>
    {
      if (this.latitude === element.Lat && this.longitutde === element.Lon) {
        this.shareData.emit<any>(element);
        this.router.navigate(['property-details']);
        return;
    }
    });
    ForSellCoord.forEach((element: { id: number, name: string, Lat: number, Lon: number, cost: string, houseImage: string }) =>
    {
      if (this.latitude === element.Lat && this.longitutde === element.Lon) {
        this.shareData.emit<any>(element);
        this.router.navigate(['property-details']);
        return;
      }
    })
  

  }
  makeVisible11()
  {
    this.makeVisible1 = !this.makeVisible1;
  }
  makeVisible22()
  {
    this.makeVisible2 = !this.makeVisible2;
  }
  makeVisible33()
  {
    this.makeVisible3 = !this.makeVisible3;
  }
  makeVisible44()
  {
    var i = 0;
    this.makeVisible4 = !this.makeVisible4;
    if (this.down44 === true && this.up44 === false && i===0) {
      this.down44 = false;
      this.up44 = true;
      i++;
      console.log(`${this.down44} and ${this.up44}`);
    }
    else {
      this.down44 = true;
      this.up44 = false;
      console.log("down-active");
    }
   
  }
apply(){
  var i =0;
  if(this.ifClicked === false && i ===0){
    this.ifClicked =true;
    i++;
    this.applyStyle = "background-color:white; color:blue;";
  }
 
  this.filterData = {
    minPriceRange:this.minPriceRange,
    maxPriceRange: this.maxPriceRange,
    bedroom : this.bedroom,
    bathroom : this.bathroom
  }
  DashboardComponent.filteredData = this.filterData;
  this.store.dispatch(filter());

  this.store.select('propertyReducer').subscribe((data) =>
  {
  
    console.log(JSON.stringify(data));
  })


  localStorage.setItem('filter-Data', JSON.stringify(this.filterData));
  // console.log(JSON.stringify(this.filterData));
  // console.log(localStorage.getItem('filter-Data'));
}
reset(){
if(this.ifClicked === true){
  this.ifClicked = false;
  this.applyStyle = "";
}

  localStorage.removeItem('filter-Data')
}

showHidesidebar(){
  this.showHideSidebarMenu = !this.showHideSidebarMenu;
  if (!this.showHideSidebarMenu) {
    this.mapStyle = "width: 100%; margin:0px; ";
    this.hide = false;
    this.show = true;
  }
  else {
    this.mapStyle = "width: 80%; margin:0px; ";
    
    this.show = false;
    this.hide = true;
  }
  var upd = setInterval(function ()
  {
    window.dispatchEvent(new Event('resize'));
    clearInterval(upd)
  }, 0)
}
  showDiv1()
  {
    this.propertyTypeColor1 = "white";
    this.propertyTypeColor2 = "";
    this.propertyTypeColor3 = "";

    this.showOnA1 = true;
    this.showOnA2 = false;
    this.showOnA3 = false;
  

  }

  showDiv2()
  {
    this.propertyTypeColor1 = "";
    this.propertyTypeColor2 = "white";
    this.propertyTypeColor3 = "";

    this.showOnA1 = false;
    this.showOnA2 = true;
    this.showOnA3 = false;

  }

  showDiv3()
  {
    this.propertyTypeColor1 = "";
    this.propertyTypeColor2 = "";
    this.propertyTypeColor3 = "white";
    this.showOnA1 = false;
    this.showOnA2 = false;
    this.showOnA3 = true;
  }
 
  // shrinkSidebarMenu()
  // {
  //   this.showHideSidebarMenu = false;
  // }

//    showHideSidebarMenu() {
// this.showHideSidebar=!this.showHideSidebar;
// }

  private initMap(): void
  {

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');



    //////////////////////////////////////////////////////////////////////////////////////
    this.target = 'map';


    forRentCoord.forEach((element: { Lat: number; Lon: number; name: any; houseImage: any; cost:any}) =>
    {
      this.location = new Feature({
        geometry: new Point(fromLonLat([element.Lon, element.Lat])),
        Lat: element.Lat,
        Lon: element.Lon,
        name: element.name,
        houseImage: element.houseImage,
        cost: element.cost
      });

      this.location.setStyle(new Style({
        image: new Icon(({
          // color: '#8959A8',
          crossOrigin: 'anonymous',
          src: '../assets/images/pin6.png',
          scale: .08,
          // imgSize: [100, 100]
        }))
      }));
      this.locationsObject.push(this.location);
    });


    forSellCoord.forEach((element: { Lat: number; Lon: number; name: any; houseImage: any; cost: any }) =>
    {
      this.location = new Feature({
        geometry: new Point(fromLonLat([element.Lon, element.Lat])),
        Lat: element.Lat,
        Lon:element.Lon,
        name: element.name,
        houseImage: element.houseImage,
        cost: element.cost
      });

      this.location.setStyle(new Style({
        image: new Icon(({
          // color: '#8959A8',
          crossOrigin: 'anonymous',
          src: '../assets/images/pin12.png',
          scale: 0.08,

        }))
      }));
      this.locationsObject.push(this.location);
    });

    this.vectorSource = new VectorSource({
      features: this.locationsObject
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    // this.rasterLayer = new TileLayer({
    //   source: new TileJSON({
    //     url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
    //     crossOrigin: 'anonymous'
    //   })
    // });

    // this.map = new Map({
    //   target: 'map',
    //   layers: [this.rasterLayer, this.vectorLayer],
    //   view: new View({
    //     center: fromLonLat([-103.1189090004137, 40.92062772664223]),
    //     zoom: 4.5
    //   })
    // });

    const overlay = new Overlay({
      element: container!,
      stopEvent: false,
      offset: [0, -50],
    });
  
    var map = new Map({
      target: 'map',
      layers: [new TileLayer({
        source: new OSM()
      }), this.vectorLayer],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([-100.1189090004137, 35.92062772664223]),
        zoom: 4.8
      })
    });
    map.addOverlay(overlay);

    map.on('singleclick',  (event) =>
    {
          var feature = map.forEachFeatureAtPixel(event.pixel, function (feature: any)
      {
        return feature;
          });
    try {
      this.longitutde = feature.get('Lon');
      this.latitude = feature.get('Lat');
      console.log(`${this.longitutde} and ${feature.get('Lat')}`);
    } catch (error) {
      
    }
      if (map.hasFeatureAtPixel(event.pixel) === true) {
        var coordinate = event.coordinate;

        content!.innerHTML = `
        <div>
        <div style='display:flex;'>
        <img style='width: 35px; height: 35px; border-radius:5px' src="${feature.get('houseImage')}" >
        &nbsp <div>
        <div> ${feature.get('cost')}</div>
        <div style='width:100px;line-height:1em; white-space: nowrap; overflow: hidden;  text-overflow: ellipsis; font-size:12px; color:gray;'>
        ${feature.get('name')}
        </div>
        </div></div></div>`
         //content!.innerHTML = "<div><img src='../../../assets/images/logoo.png' ></div>`; 
        
        overlay.setPosition(coordinate);
      } else {
        overlay.setPosition(undefined);
        closer!.blur();
      }
    });
     map.on('pointermove', function (e)
    {
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
     map.getTargetElement().style.cursor=hit? 'pointer':'';
    });
  }
  
}
// function beforeunloadHandler(event: Event | undefined)
// {
//   throw new Error('Function not implemented.');
// }

