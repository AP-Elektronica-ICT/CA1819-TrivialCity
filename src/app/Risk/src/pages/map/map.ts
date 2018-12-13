import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import leaflet from 'leaflet';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Geolocation } from '@ionic-native/geolocation';
import 'leaflet-rotatedmarker';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { BattlePhasePage } from '../battle-phase/battle-phase';

import { ApiService, Player, Team, Area } from '../../services/api.service';
import { delay } from 'rxjs/operator/delay';

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

  playerLocation: any = {
    lat: '',
    lng: '',
    orientation: 0,
  }

  player: Player;
  playerTeam: Team;

  areas: Area[] = [];

  playerAreaId: number;

  polygons: any[];

  teamRedLayer;
  teamBlueLayer;
  teamYellowLayer;
  teamGreenLayer;


  battleBtnIsVisible = false;

  loop;

  playericon = leaflet.icon({
    iconUrl: '../assets/imgs/playericon.png',
    iconSize: [24, 24]
  })

  playerMarker = leaflet.marker([this.playerLocation.lat, this.playerLocation.lng],
    {
      icon: this.playericon,
      rotationAngle: this.playerLocation.orientation
    })

  //Every individual polygon with coordinates and color
  denDam;
  eilandje;
  seefhoek;
  borgerhout;
  kaai;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private deviceOrientation: DeviceOrientation,
    private geolocation: Geolocation,
    private platform: Platform,
    private service: ApiService) {

    this.service.GetInfo(this.service.GetYourId()).subscribe(data => {
      this.player = data
      this.service.GetTeam(this.player.teamId).subscribe(data => this.playerTeam = data)
      this.service.GetArea(this.player.areaId)
      this.service.GetAreas().subscribe(data => this.areas = data)
      if (this.areas != undefined && this.areas.length >= 0) {
        this.service.getAreaPositions(1).subscribe(data => {
          this.areas[0].positions = data
          this.service.getAreaPositions(2).subscribe(data => {
            this.areas[1].positions = data
            this.service.getAreaPositions(3).subscribe(data => {
              this.areas[2].positions = data
              this.service.getAreaPositions(4).subscribe(data => {
                this.areas[3].positions = data
                this.service.getAreaPositions(5).subscribe(data => {
                  this.areas[4].positions = data;
                  this.denDam = leaflet.polygon([
                    //Den Dam
                    [this.areas[0].positions[0].latitude, this.areas[0].positions[0].longitude],
                    [this.areas[0].positions[1].latitude, this.areas[0].positions[1].longitude],
                    [this.areas[0].positions[2].latitude, this.areas[0].positions[2].longitude],
                    [this.areas[0].positions[3].latitude, this.areas[0].positions[3].longitude],
                    [this.areas[0].positions[4].latitude, this.areas[0].positions[4].longitude],
                    [this.areas[0].positions[5].latitude, this.areas[0].positions[5].longitude],
                    [this.areas[0].positions[6].latitude, this.areas[0].positions[6].longitude],
                    [this.areas[0].positions[7].latitude, this.areas[0].positions[7].longitude],
                    [this.areas[0].positions[8].latitude, this.areas[0].positions[8].longitude],
                    [this.areas[0].positions[9].latitude, this.areas[0].positions[9].longitude],
                    [this.areas[0].positions[10].latitude, this.areas[0].positions[10].longitude],
                  ], { color: this.areas[0].areaOccupiedBy, title: 1 })

                  this.borgerhout = leaflet.polygon([
                    //Borgerhout
                    [this.areas[1].positions[0].latitude, this.areas[1].positions[0].longitude],
                    [this.areas[1].positions[1].latitude, this.areas[1].positions[1].longitude],
                    [this.areas[1].positions[2].latitude, this.areas[1].positions[2].longitude],
                    [this.areas[1].positions[3].latitude, this.areas[1].positions[3].longitude],
                    [this.areas[1].positions[4].latitude, this.areas[1].positions[4].longitude],
                    [this.areas[1].positions[5].latitude, this.areas[1].positions[5].longitude],
                    [this.areas[1].positions[6].latitude, this.areas[1].positions[6].longitude],
                    [this.areas[1].positions[7].latitude, this.areas[1].positions[7].longitude],
                    [this.areas[1].positions[8].latitude, this.areas[1].positions[8].longitude],
                    [this.areas[1].positions[9].latitude, this.areas[1].positions[9].longitude],
                    [this.areas[1].positions[10].latitude, this.areas[1].positions[10].longitude],
                    [this.areas[1].positions[11].latitude, this.areas[1].positions[11].longitude],
                    [this.areas[1].positions[12].latitude, this.areas[1].positions[12].longitude],
                    [this.areas[1].positions[13].latitude, this.areas[1].positions[13].longitude],
                  ], { color: this.areas[1].areaOccupiedBy, title: 2 })

                  this.eilandje = leaflet.polygon([
                    //Eilandje
                    [this.areas[2].positions[0].latitude, this.areas[2].positions[0].longitude],
                    [this.areas[2].positions[1].latitude, this.areas[2].positions[1].longitude],
                    [this.areas[2].positions[2].latitude, this.areas[2].positions[2].longitude],
                    [this.areas[2].positions[3].latitude, this.areas[2].positions[3].longitude],
                    [this.areas[2].positions[4].latitude, this.areas[2].positions[4].longitude],
                    [this.areas[2].positions[5].latitude, this.areas[2].positions[5].longitude],
                    [this.areas[2].positions[6].latitude, this.areas[2].positions[6].longitude],
                    [this.areas[2].positions[7].latitude, this.areas[2].positions[7].longitude],
                    [this.areas[2].positions[8].latitude, this.areas[2].positions[8].longitude],
                    [this.areas[2].positions[9].latitude, this.areas[2].positions[9].longitude],
                    [this.areas[2].positions[10].latitude, this.areas[2].positions[10].longitude],
                    [this.areas[2].positions[11].latitude, this.areas[2].positions[11].longitude],
                    [this.areas[2].positions[12].latitude, this.areas[2].positions[12].longitude],
                    [this.areas[2].positions[13].latitude, this.areas[2].positions[13].longitude],
                  ], { color: this.areas[2].areaOccupiedBy, title: 3 })

                  this.seefhoek = leaflet.polygon([
                    //Seefhoek
                    [this.areas[3].positions[0].latitude, this.areas[3].positions[0].longitude],
                    [this.areas[3].positions[1].latitude, this.areas[3].positions[1].longitude],
                    [this.areas[3].positions[2].latitude, this.areas[3].positions[2].longitude],
                    [this.areas[3].positions[3].latitude, this.areas[3].positions[3].longitude],
                    [this.areas[3].positions[4].latitude, this.areas[3].positions[4].longitude],
                    [this.areas[3].positions[5].latitude, this.areas[3].positions[5].longitude],
                    [this.areas[3].positions[6].latitude, this.areas[3].positions[6].longitude],
                    [this.areas[3].positions[7].latitude, this.areas[3].positions[7].longitude],
                    [this.areas[3].positions[8].latitude, this.areas[3].positions[8].longitude],
                    [this.areas[3].positions[9].latitude, this.areas[3].positions[9].longitude],
                    [this.areas[3].positions[10].latitude, this.areas[3].positions[10].longitude],
                    [this.areas[3].positions[11].latitude, this.areas[3].positions[11].longitude],
                    [this.areas[3].positions[12].latitude, this.areas[3].positions[12].longitude],
                    [this.areas[3].positions[13].latitude, this.areas[3].positions[13].longitude],
                  ], { color: this.areas[3].areaOccupiedBy, title: 4 })

                  this.kaai = leaflet.polygon([
                    //De kaai
                    [this.areas[4].positions[0].latitude, this.areas[4].positions[0].longitude],
                    [this.areas[4].positions[1].latitude, this.areas[4].positions[1].longitude],
                    [this.areas[4].positions[2].latitude, this.areas[4].positions[2].longitude],
                    [this.areas[4].positions[3].latitude, this.areas[4].positions[3].longitude],
                    [this.areas[4].positions[4].latitude, this.areas[4].positions[4].longitude],
                    [this.areas[4].positions[5].latitude, this.areas[4].positions[5].longitude],
                    [this.areas[4].positions[6].latitude, this.areas[4].positions[6].longitude],
                    [this.areas[4].positions[7].latitude, this.areas[4].positions[7].longitude],
                    [this.areas[4].positions[8].latitude, this.areas[4].positions[8].longitude],
                    [this.areas[4].positions[9].latitude, this.areas[4].positions[9].longitude],
                  ], { color: this.areas[4].areaOccupiedBy, title: 5 })

                  this.loadmap();
                });
              });
            });
          });
        });
      }
    });

    platform.ready().then(() => {
      //Device Orientation subscription
      const options = { frequency: 50 };
      const orientationSubscription = deviceOrientation.watchHeading(options).subscribe(
        (data3: DeviceOrientationCompassHeading) => { this.playerMarker.setRotationAngle(data3.magneticHeading), this.playerLocation.orientation = data3.magneticHeading }
        , (error: any) => console.log(error + " - error message"));

      //Geolocation subscription
      const positionSubscription = geolocation.watchPosition()
        .filter((p) => p.coords !== undefined) //filter out errors
        .subscribe(position => {
          this.playerMarker.setLatLng([position.coords.latitude, position.coords.longitude])
          this.playerLocation.lat = position.coords.latitude,
            this.playerLocation.lng = position.coords.longitude
        })
      const loop = Observable.interval(5000).subscribe((val) => {
        this.territoryChecker();
        this.service.PutPlayer(this.player.playerId, {
          playerId: `${this.player.playerId}`,
          areaId: `${this.playerAreaId}`
        }).subscribe(data => this.player = data)
        console.log(this.player)
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ionViewDidEnter() {


  }

  goToBattlePhase() {
    this.navCtrl.push(BattlePhasePage);
  }


  loadmap() {

    //Polygon Array
    this.polygons = [this.denDam, this.eilandje, this.seefhoek, this.borgerhout, this.kaai];
    //Add every individual polygon to the layer of a team
    this.teamRedLayer = leaflet.featureGroup([this.denDam, this.eilandje]);
    this.teamBlueLayer = leaflet.featureGroup([this.seefhoek]);
    this.teamYellowLayer = leaflet.featureGroup([this.borgerhout]);
    this.teamGreenLayer = leaflet.featureGroup([this.kaai]);


    // This adds the map to the screen
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Player',
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
      this.playerMarker = leaflet.marker([this.playerLocation.lat, this.playerLocation.lng],
        {
          icon: this.playericon,
          rotationAngle: this.playerLocation.orientation
        })
      markerGroup.addLayer(this.playerMarker);
      this.map.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
    })
    //This adds custom district polygons to the map

    this.teamRedLayer.addTo(this.map);
    this.teamBlueLayer.addTo(this.map);
    this.teamGreenLayer.addTo(this.map);
    this.teamYellowLayer.addTo(this.map);

  }

  territoryChecker() {
    if (this.playerLocation.lat && this.playerLocation.lng && this.polygons) {
      for (let i = 0; i < this.polygons.length; i++) {
        if (this.polygons[i].getBounds().contains(this.playerMarker.getLatLng())) {

          this.playerAreaId = this.polygons[i].options.title;
          console.log(this.playerAreaId)

          if (this.polygons[i].options.color != this.playerTeam.teamColor) {
            this.battleBtnIsVisible = true;
          }
          else {
            this.battleBtnIsVisible = false;
          }
        }
        else {
          this.playerAreaId = 3;
        }
      }
    }
  }
}
