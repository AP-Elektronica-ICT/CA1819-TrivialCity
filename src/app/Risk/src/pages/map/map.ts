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
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  };

  ionViewDidEnter(){
    this.loadmap();
  }

  loadmap(){
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
      attributions: 'Sam',
      maxZoom: 19
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 18
    }).on('locationfound', (e) => {
      console.log('Your location has been found');
      let markerGroup = leaflet.featureGroup();

      var playerMarker = leaflet.icon({
        iconUrl: '../assets/mapicons/player-marker.png',
        iconSize: [32,32]
      })
      
      let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: playerMarker}).on('click', () => {
        //alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
