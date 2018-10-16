import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  playericon = leaflet.icon({
    iconUrl: '../assets/imgs/playericon.png',
    iconSize: [24,24]
  })


  districts: any[] = [{
        name: 'Den Dam',
        p1: {
          lat: 51.226317,
          lng: 4.414693
        },
        p2: {
          lat: 51.230859,
          lng: 4.413208
        },
        p3: {
          lat: 51.231278,
          lng: 4.419713
        },
        p4: {
          lat: 51.235015,
          lng: 4.420325
        },
        p5: {
          lat: 51.234914,
          lng: 4.428972
        },
        p6: {
          lat: 51.227991,
          lng: 4.439990
        },
        p7: {
          lat: 51.228790,
          lng: 4.426193
        }
    },{
      name: 'Het Eilandje',
      p1: {
        lat: 51.226317,
        lng: 4.414693,
      },
      p2: {
        lat: 51.227108,
        lng: 4.411271
      },
      p3: {
        lat: 51.227080,
        lng: 4.399555
      },
      p4: {
        lat: 51.232166,
        lng: 4.401722
      },
      p5: {
        lat: 51.235310,
        lng: 4.401036
      },
      p6: {
        lat: 51.238508,
        lng: 4.397946
      },
      p7: {
        lat: 51.241786,
        lng: 4.404469
      },
      p8: {
        lat: 51.241899,
        lng: 4.407903
      },
      p9: {
        lat: 51.239587,
        lng: 4.420263
      },
      p10: {
        lat: 51.231278,
        lng: 4.419713
      },
      p11: {
        lat: 51.230859,
        lng: 4.413208
      }
    }];

  polygon = leaflet.polygon([
    //Den Dam
    [this.districts[0].p1.lat, this.districts[0].p1.lng],
    [this.districts[0].p2.lat, this.districts[0].p2.lng],
    [this.districts[0].p3.lat, this.districts[0].p3.lng],
    [this.districts[0].p4.lat, this.districts[0].p4.lng],
    [this.districts[0].p5.lat, this.districts[0].p5.lng],
    [this.districts[0].p6.lat, this.districts[0].p6.lng],
    [this.districts[0].p7.lat, this.districts[0].p7.lng],
  ],
  [//Het Eilandje
    [this.districts[1].p1.lat, this.districts[1].p1.lng],
    [this.districts[1].p2.lat, this.districts[1].p2.lng],
    [this.districts[1].p3.lat, this.districts[1].p3.lng],
    [this.districts[1].p4.lat, this.districts[1].p4.lng],
    [this.districts[1].p5.lat, this.districts[1].p5.lng],
    [this.districts[1].p6.lat, this.districts[1].p6.lng],
    [this.districts[1].p7.lat, this.districts[1].p7.lng],
    [this.districts[1].p8.lat, this.districts[1].p8.lng],
    [this.districts[1].p9.lat, this.districts[1].p9.lng],
    [this.districts[1].p10.lat, this.districts[1].p10.lng],
    [this.districts[1].p11.lat, this.districts[1].p11.lng],
  ]);

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap(){
    // This adds the map to the screen
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Sam',
      maxZoom: 20
    }).addTo(this.map);

    //This will add geolocation
    this.map.locate({
      setView: true,
      maxZoom: 18
    }).on('locationfound', (e) => {
      console.log('playerlocation found');
      }).on('locationfound', (e) => {
        // Add player icon to player location
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: this.playericon})
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
        }).on('locationerror', (err) => {
          alert(err.message);
      })

    this.polygon.addTo(this.map);
  }

}
