import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { SplashScreen } from '@ionic-native/splash-screen';
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
  playerAreaIdArray: number[] = [];
  playerAreaId: number = 0;

  areas: Area[] = [];

  color: string;

  polygons: any[];
  polygonsLayer;

  centerMarkers: any[];
  centerMarkersLayer = leaflet.featureGroup();
  centerMarkerOptions = leaflet.icon({
    iconUrl: '../assets/imgs/mpbattle.png',
    iconSize: [32, 32]
  })

  battleBtnIsVisible = false;
  supportBtnIsVisible = false;

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
  //center of every individual polygon with coordinates
  denDamCenter;
  eilandjeCenter;
  seefhoekCenter;
  borgerhoutCenter;
  kaaiCenter;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private deviceOrientation: DeviceOrientation,
    private geolocation: Geolocation,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private service: ApiService,
    private alertCtrl: AlertController) {

    this.splashScreen.show();

    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => {
      this.player = data
      this.service.GetTeam(this.player.teamId).subscribe(data => this.playerTeam = data)
      this.service.GetAreas().subscribe(data => {
        this.areas = data;
        console.log(data);
      })
      if (this.areas != undefined && this.areas.length >= 0) {

        this.service.getAreaPlayers(1).subscribe(data => {
          this.areas[1].players = data
          this.service.getAreaPlayers(2).subscribe(data => {
            this.areas[2].players = data
            this.service.getAreaPlayers(3).subscribe(data => {
              this.areas[3].players = data
              this.service.getAreaPlayers(4).subscribe(data => {
                this.areas[4].players = data
                this.service.getAreaPlayers(5).subscribe(data => {
                  this.areas[5].players = data
                  this.service.getAreaPositions(1).subscribe(data => {
                    this.areas[1].positions = data
                    this.service.getAreaPositions(2).subscribe(data => {
                      this.areas[2].positions = data
                      this.service.getAreaPositions(3).subscribe(data => {
                        this.areas[3].positions = data
                        this.service.getAreaPositions(4).subscribe(data => {
                          this.areas[4].positions = data
                          this.service.getAreaPositions(5).subscribe(data => {
                            this.areas[5].positions = data;
                            this.denDam = leaflet.polygon([
                              //Den Dam
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
                            ], { color: this.colorSelector(this.areas[1].teamId), title: 1 })

                            this.borgerhout = leaflet.polygon([
                              //Borgerhout
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
                            ], { color: this.colorSelector(this.areas[2].teamId), title: 2 })

                            this.eilandje = leaflet.polygon([
                              //Eilandje
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
                            ], { color: this.colorSelector(this.areas[3].teamId), title: 3 })

                            this.seefhoek = leaflet.polygon([
                              //Seefhoek
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
                              [this.areas[4].positions[10].latitude, this.areas[4].positions[10].longitude],
                              [this.areas[4].positions[11].latitude, this.areas[4].positions[11].longitude],
                              [this.areas[4].positions[12].latitude, this.areas[4].positions[12].longitude],
                              [this.areas[4].positions[13].latitude, this.areas[4].positions[13].longitude],

                            ], { color: this.colorSelector(this.areas[4].teamId), title: 4 })

                            this.kaai = leaflet.polygon([
                              //De kaai
                              [this.areas[5].positions[0].latitude, this.areas[5].positions[0].longitude],
                              [this.areas[5].positions[1].latitude, this.areas[5].positions[1].longitude],
                              [this.areas[5].positions[2].latitude, this.areas[5].positions[2].longitude],
                              [this.areas[5].positions[3].latitude, this.areas[5].positions[3].longitude],
                              [this.areas[5].positions[4].latitude, this.areas[5].positions[4].longitude],
                              [this.areas[5].positions[5].latitude, this.areas[5].positions[5].longitude],
                              [this.areas[5].positions[6].latitude, this.areas[5].positions[6].longitude],
                              [this.areas[5].positions[7].latitude, this.areas[5].positions[7].longitude],
                              [this.areas[5].positions[8].latitude, this.areas[5].positions[8].longitude],
                              [this.areas[5].positions[9].latitude, this.areas[5].positions[9].longitude],
                              [this.areas[5].positions[10].latitude, this.areas[5].positions[10].longitude],

                            ], { color: this.colorSelector(this.areas[5].teamId), title: 5 })

                            this.denDamCenter = leaflet.marker([this.areas[1].positions[11].latitude, this.areas[1].positions[11].longitude], { icon: this.centerMarkerOptions });
                            this.borgerhoutCenter = leaflet.marker([this.areas[2].positions[14].latitude, this.areas[2].positions[14].longitude], { icon: this.centerMarkerOptions });
                            this.eilandjeCenter = leaflet.marker([this.areas[3].positions[14].latitude, this.areas[3].positions[14].longitude], { icon: this.centerMarkerOptions });
                            this.seefhoekCenter = leaflet.marker([this.areas[4].positions[14].latitude, this.areas[4].positions[14].longitude], { icon: this.centerMarkerOptions });
                            this.kaaiCenter = leaflet.marker([this.areas[5].positions[11].latitude, this.areas[5].positions[11].longitude], { icon: this.centerMarkerOptions });

                            this.centerMarkers = [this.denDamCenter, this.eilandjeCenter, this.seefhoekCenter, this.borgerhoutCenter, this.kaaiCenter];

                            //Polygon Array
                            this.polygons = [this.denDam, this.eilandje, this.seefhoek, this.borgerhout, this.kaai];
                            //Add every individual polygon to the polygon layer
                            this.polygonsLayer = leaflet.featureGroup(this.polygons);

                            this.loadmap();
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
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
      const loop = Observable.interval(1000).subscribe((val) => {
        
        if (this.areas) {
          this.AreaActivityChecker();
        }

        this.territoryChecker();

        if (this.playerAreaIdArray && this.playerAreaId && this.playerAreaIdArray[this.playerAreaId] != 0) {
          this.service.PutPlayer(this.player.playerId, {
            playerId: `${this.player.playerId}`,
            areaId: `${this.playerAreaIdArray[this.playerAreaId]}`
          }).subscribe(data => this.player = data)
        }

        else if(this.playerAreaIdArray[this.playerAreaId] == 0 || this.playerAreaIdArray[this.playerAreaId] == undefined || this.playerAreaIdArray[this.playerAreaId] == null){
          this.service.PutPlayer(this.player.playerId, {
            playerId: `${this.player.playerId}`,
            areaId: 0
          }).subscribe(data => this.player = data)
        }

      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  goToBattlePhase() {
    this.navCtrl.push(BattlePhasePage);
  }

  loadmap() {

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
    this.splashScreen.hide();

    //Add the area polygons layer to the map
    this.polygonsLayer.addTo(this.map);

    this.centerMarkersLayer.addTo(this.map);

  }

  territoryChecker() {
    if (this.playerLocation.lat && this.playerLocation.lng && this.polygons) {
      for (let i = 1; i <= this.polygons.length; i++) {
        if (this.polygons[i].getBounds().contains(this.playerMarker.getLatLng())) {

          this.playerAreaIdArray[i] = this.polygons[i].options.title;
          this.playerAreaId = i;

          if (this.polygons[i].options.color != this.playerTeam.teamColor) {
            this.battleBtnIsVisible = true;
            this.supportBtnIsVisible = false;
          }
          else {
            this.battleBtnIsVisible = false;
            this.supportBtnIsVisible = true;
          }
        }
        else {
          this.playerAreaIdArray[i] = 0;
        }
      }
      if (this.player.areaId == 0) {
        this.battleBtnIsVisible = false;
        this.supportBtnIsVisible = false;
      }
    }
  }

  AreaActivityChecker() {
    if (this.areas && this.centerMarkers) {
      for (let i = 1; i < this.centerMarkers.length; i++) {
        if (this.areas[i].players.length > 1 /*this number decides how many players are needed to display 'multi player battle marker'*/) {
          this.centerMarkers[i-1].addTo(this.centerMarkersLayer);
        }
      }
    }
  }

  supportArea() {
    let alert = this.alertCtrl.create({
      title: 'Send Troops',
      subTitle: `You currently have ${this.player.playerTroops} troops remaining`,
      inputs: [
        {
          name: 'amount',
          placeholder: 'Amount',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: 'Send',
          handler: data => {
            data.amount = Math.floor(data.amount);
            if (data.amount <= 0 || data.amount > this.player.playerTroops) {
              this.errorAlert();
            }
            else {
              this.player.playerTroops -= data.amount;
              this.service.PutArea(this.areas[this.player.areaId].areaId, {
                areaId: this.areas[this.player.areaId].areaId,
                defendingTroops: `${this.player.playerTroops}`,
              }).subscribe(data => {
                this.areas[this.player.areaId] = data;
              })
            }
          }
        }
      ]
    });
    alert.present();
  }

  errorAlert() {
    let errorAlert = this.alertCtrl.create({
      title: 'Invalid Amount',
      subTitle: 'Please insert a valid amount of troops.',
      buttons: ['Dismiss']
    });
    errorAlert.present();
  }

  colorSelector(teamId: number): String {

    switch (teamId) {
      case 1: {
        return "Blue";
      }
      case 2: {
        return "Red";
      }
      case 3: {
        return "Green";
      }
      case 4: {
        return "Yellow";
      }
    }
  }
}
