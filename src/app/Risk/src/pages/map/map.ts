import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Alert } from 'ionic-angular';
import leaflet from 'leaflet';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Geolocation } from '@ionic-native/geolocation';
import 'leaflet-rotatedmarker';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { BattlePhasePage } from '../battle-phase/battle-phase';

import { ApiService, Player, Team, Area, Position } from '../../services/api.service';

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
  playerTeam: Team

  areas: Area[] = [];

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
      lat: 51.226783,
      lng: 4.436743
    },
    p8: {
      lat: 51.227663,
      lng: 4.435061
    },
    p9: {
      lat: 51.227942,
      lng: 4.433815
    },
    p10: {
      lat: 51.227836,
      lng: 4.430798
    },
    p11: {
      lat: 51.228767,
      lng: 4.426224
    },
  }, {
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
      lat: 51.226936,
      lng: 4.405197
    },
    p4: {
      lat: 51.227091,
      lng: 4.401156
    },
    p5: {
      lat: 51.227080,
      lng: 4.399555
    },
    p6: {
      lat: 51.232166,
      lng: 4.401722
    },
    p7: {
      lat: 51.235310,
      lng: 4.401036
    },
    p8: {
      lat: 51.238508,
      lng: 4.397946
    },
    p9: {
      lat: 51.241786,
      lng: 4.404469
    },
    p10: {
      lat: 51.241899,
      lng: 4.407903
    },
    p11: {
      lat: 51.239587,
      lng: 4.420263
    },
    p12: {
      lat: 51.235015,
      lng: 4.420325
    },
    p13: {
      lat: 51.231278,
      lng: 4.419713
    },
    p14: {
      lat: 51.230859,
      lng: 4.413208
    }
  }, {
    name: 'Seefhoek',
    p1: {
      lat: 51.226317,
      lng: 4.414693
    },
    p2: {
      lat: 51.228767,
      lng: 4.426224
    },
    p3: {
      lat: 51.227836,
      lng: 4.430798
    },
    p4: {
      lat: 51.227942,
      lng: 4.433815,
    },
    p5: {
      lat: 51.227663,
      lng: 4.435061
    },
    p6: {
      lat: 51.226783,
      lng: 4.436743
    },
    p7: {
      lat: 51.221772,
      lng: 4.436900
    },
    p8: {
      lat: 51.219695,
      lng: 4.435456
    },
    p9: {
      lat: 51.218802,
      lng: 4.431648
    },
    p10: {
      lat: 51.218956,
      lng: 4.431175
    },
    p11: {
      lat: 51.217511,
      lng: 4.428144
    },
    p12: {
      lat: 51.218701,
      lng: 4.423484
    },
    p13: {
      lat: 51.219779,
      lng: 4.416132
    },
    p14: {
      lat: 51.220934,
      lng: 4.416598
    }
  }, {
    name: 'Borgerhout',
    p1: {
      lat: 51.227991,
      lng: 4.439990
    },
    p2: {
      lat: 51.220914,
      lng: 4.449414
    },
    p3: {
      lat: 51.217855,
      lng: 4.447352
    },
    p4: {
      lat: 51.215694,
      lng: 4.446721
    },
    p5: {
      lat: 51.213827,
      lng: 4.440785
    },
    p6: {
      lat: 51.215598,
      lng: 4.432207
    },
    p7: {
      lat: 51.216351,
      lng: 4.430431
    },
    p8: {
      lat: 51.217257,
      lng: 4.429056
    },
    p9: {
      lat: 51.217511,
      lng: 4.428144
    },
    p10: {
      lat: 51.218956,
      lng: 4.431175
    },
    p11: {
      lat: 51.218802,
      lng: 4.431648
    },
    p12: {
      lat: 51.219695,
      lng: 4.435456
    },
    p13: {
      lat: 51.221772,
      lng: 4.436900
    },
    p14: {
      lat: 51.226783,
      lng: 4.436743
    }
  }, {
    name: 'De Kaai',
    p1: {
      lat: 51.227080,
      lng: 4.399555
    },
    p2: {
      lat: 51.227091,
      lng: 4.401156
    },
    p3: {
      lat: 51.226356,
      lng: 4.400389
    },
    p4: {
      lat: 51.222221,
      lng: 4.397784
    },
    p5: {
      lat: 51.218815,
      lng: 4.395516
    },
    p6: {
      lat: 51.219131,
      lng: 4.394291
    },
    p7: {
      lat: 51.221740,
      lng: 4.396078
    },
    p8: {
      lat: 51.221836,
      lng: 4.395771
    },
    p9: {
      lat: 51.222668,
      lng: 4.396323
    },
    p10: {
      lat: 51.222697,
      lng: 4.396713
    },
    p11: {
      lat: 51.227080,
      lng: 4.399555
    }
  }];

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
                  ], { color: this.areas[0].areaOccupiedBy })

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
                  ], { color: this.areas[1].areaOccupiedBy })

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
                  ], { color: this.areas[2].areaOccupiedBy })

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
                  ], { color: this.areas[3].areaOccupiedBy })

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
                  ], { color: this.areas[4].areaOccupiedBy })
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
      const options = { frequency: 100 };
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

          const loop = Observable.interval(1000).subscribe((val) => {
            /*this.service.PutInfo(this.player.playerId, {
              playerId: `${this.player.playerId}`,
              areaId: `${this.areas}`
            })*/
            this.territoryChecker() 
          })
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
        if (this.polygons[i].getBounds().contains(this.playerMarker.getLatLng()) && this.polygons[i].options.color != this.playerTeam.teamColor) {
          this.battleBtnIsVisible = true;
        }
        else {
          this.battleBtnIsVisible = false;
        }
      }
    }
  }
}
