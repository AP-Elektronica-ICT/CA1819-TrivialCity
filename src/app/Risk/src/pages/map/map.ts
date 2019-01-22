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
import inside from 'point-in-polygon';
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
    lat: '0',
    lng: '0',
    orientation: 0,
  }
  testArray: any[] = [
    [50, 20],
    [30, 40]
  ];
  player: Player;

  areaPlayersLoaded: boolean = false;
  areaPositionsloaded: boolean = false;

  isLoaded: Boolean = false;
  undefiendCheck: Boolean = false;
  //Total amount of areas in the game
  areaTotal: number = 3;

  //Essential variables for determining in which area the player is
  areaArray: number[] = [];
  areaCounter: number = 0;

  areas: Area[] = [];

  color: string;

  polygonsPositions: any[][] = [[], [], [], []];
  polygons: any[] = [];
  polygonsLayer;

  centerMarkers: any[] = [];
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
      this.service.GetAreas().subscribe(data => {
        this.areas = data;
        this.Initialize();
      })
    });




    platform.ready().then(() => {
      console.log("1: " + this.areaPlayersLoaded + "  " + this.areaPositionsloaded);
      
      //Device Orientation subscription
      const options = { frequency: 50 };
      const orientationSubscription = deviceOrientation.watchHeading(options).subscribe(
        (data3: DeviceOrientationCompassHeading) => { this.playerMarker.setRotationAngle(data3.magneticHeading), this.playerLocation.orientation = data3.magneticHeading }
        , (error: any) => console.log(error + " - error message"));

      //Geolocation subscription - Updates playermarker location
      const positionSubscription = geolocation.watchPosition()
        .filter((p) => p.coords !== undefined) //filter out errors
        .subscribe(position => {
          this.playerMarker.setLatLng([position.coords.latitude, position.coords.longitude])
          this.playerLocation.lat = position.coords.latitude;
          this.playerLocation.lng = position.coords.longitude;
        })

      const loop = Observable.interval(1000).subscribe((val) => {
        console.log(this.areas[0].players);
        console.log(this.areas[1].players);
        console.log(this.areas[2].players);
        if (this.areaPlayersLoaded == true && this.areaPositionsloaded == true && typeof this.areas != "undefined") {
          console.log("2: " + this.areaPlayersLoaded + "  " + this.areaPositionsloaded);

          if (this.areas != null && this.areas != undefined && this.areas != [] && this.areas.length != 0) {
            if (this.areaPlayersLoaded == true && this.areaPositionsloaded == true && this.isLoaded == false) {
              this.LoadAreaPositions();
              this.polygonsLayer = leaflet.featureGroup(this.polygons);
              this.loadmap();
              this.isLoaded = true;
            }
          }

          if (this.playerLocation && this.player && this.polygons && this.areas && this.service.areas) {

            //Updates Area colors, centermarkers
            this.UpdateAreas();

            //Checks in which area the player is
            this.territoryChecker();
          }
        }
        else {
          console.log("3: " + this.areaPlayersLoaded + "  " + this.areaPositionsloaded);

          this.service.GetAreas().subscribe(data => {
            this.areas = data;
            for (let i = 0; i < this.areaTotal; i++) {
              this.service.getAreaPlayers(i + 1).subscribe(data => {
                this.areas[i].players = data;
                if (this.areas[this.areaTotal - 1].players != undefined) {
                  this.areaPlayersLoaded = true;
                }
              });
              this.service.getAreaPositions(i + 1).subscribe(data => {
                this.areas[i].positions = data;
                if (this.areas[this.areaTotal - 1].positions != undefined) {
                  this.areaPositionsloaded = true;
                }
              });
            }
          })
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

    //This center map to player location
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
    if (this.polygonsLayer != undefined && this.polygons != undefined) {
      this.polygonsLayer.addTo(this.map);
    }

    if (this.centerMarkersLayer != undefined && this.centerMarkers != undefined) {
      this.centerMarkersLayer.addTo(this.map);
    }

    if (this.polygons) {
      this.SetPopupDefendTroops();
    }

  }

  SetPopupDefendTroops() {
    for (let i = 0; i < this.polygons.length; i++) {
      this.polygons[i].bindPopup(`<b><h3>${this.areas[i].areaName}</h3></b> Defending Troops: ${this.areas[i].defendingTroops}`);
    }
  }

  //Checks in which area the player is
  territoryChecker() {
    for (let i = 0; i < this.areaTotal; i++) {
      if (inside([this.playerLocation.lat, this.playerLocation.lng], this.polygonsPositions[i])) {
        this.areaArray[i] = i + 1;
        this.areaCounter = i;
      }
      else {
        this.areaArray[i] = 0;
      }
    }
    if (this.areaArray[this.areaCounter] != 0) {
      this.service.PutPlayer(this.player.playerId, {
        playerId: this.player.playerId,
        areaId: this.areaArray[this.areaCounter]
      }).subscribe(data => this.player = data)
    }
    else {
      this.service.PutPlayer(this.player.playerId, {
        playerId: this.player.playerId,
        areaId: 5
      }).subscribe(data => this.player = data)
    }
    if (this.player.areaId != 5) {
      if (this.areas[this.areaCounter].teamId != this.player.teamId) {
        this.battleBtnIsVisible = true;
        this.supportBtnIsVisible = false;
      }
      else {
        this.battleBtnIsVisible = false;
        this.supportBtnIsVisible = true;
      }
    }
    else {
      this.battleBtnIsVisible = false;
      this.supportBtnIsVisible = false;
    }
  }

  AreaActivityChecker() {
    for (let i = 0; i < this.areaTotal; i++) {
      if (this.areas[i].players.length > 1 /*this number decides how many players are needed to display 'multi player battle marker'*/) {
        this.centerMarkers[i].addTo(this.centerMarkersLayer);
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
              //this.player.playerTroops -= data.amount;
              this.service.PutPlayer(this.service.GetYourId(),
                {
                  playerId: this.service.GetYourId(),
                  playerTroops: this.player.playerTroops - data.amount,
                })
                .subscribe(data => this.player = data);
              this.service.PutArea(this.areas[this.player.areaId].areaId, {
                areaId: this.areas[this.player.areaId].areaId,
                defendingTroops: this.areas[this.player.areaId].defendingTroops + data.amount,
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
        return "blue";
      }
      case 2: {
        return "red";
      }
      case 3: {
        return "green";
      }
      case 4: {
        return "yellow";
      }
    }
  }

  LoadAreaPositions() {
    console.log(this.areas[0].positions);
    console.log(this.areas[1].positions);
    console.log(this.areas[2].positions);
    for (let i = 0; i < this.areaTotal; i++) {
      for (let j = 0; j < this.areas[i].positions.length - 1; j++) {
        this.polygonsPositions[i].push([this.areas[i].positions[j].latitude, this.areas[i].positions[j].longitude])
        console.log(i + ":  " + this.polygonsPositions[i]);
      }
      this.polygons[i] = leaflet.polygon(this.polygonsPositions[i], { color: this.colorSelector(this.areas[i].teamId), title: i })
      this.undefiendCheck = false;
      while ((this.areas[i].positions[this.areas[i].positions.length - 1] == undefined && this.areas[i].positions[this.areas[i].positions.length - 1] == null && this.areas[i].positions == []) && this.undefiendCheck == false) {
        this.centerMarkers[i] = leaflet.marker([this.areas[i].positions[this.areas[i].positions.length - 1].latitude, this.areas[i].positions[this.areas[i].positions.length - 1].longitude], { icon: this.centerMarkerOptions });
        if (this.areas[i].positions[this.areas[i].positions.length - 1] != undefined && this.areas[i].positions[this.areas[i].positions.length - 1] != null && this.areas[i].positions != []) {
          this.undefiendCheck == true;
        }
      }
      this.undefiendCheck = false;
    }
  }

  Initialize() {
    for (let i = 0; i < this.areaTotal; i++) {
      setTimeout(() => {
        this.service.getAreaPlayers(i + 1).subscribe(data => {
          this.areas[i].players = data;
          if (this.areas[this.areaTotal - 1].players != undefined && this.areas[this.areaTotal - 1].players != []) {
            this.areaPlayersLoaded = true;
          }
        });
        this.service.getAreaPositions(i + 1).subscribe(data => {
          this.areas[i].positions = data;
          if (this.areas[this.areaTotal - 1].positions != undefined && this.areas[this.areaTotal - 1].players != []) {
            this.areaPositionsloaded = true;
          }
        });
      }, 2000 / this.areaTotal);
    }
  }

  UpdateAreas() {
    //Updates the polygon colors && popup defending troops
    this.service.GetAreas().subscribe(data => {
      if (this.areas != data) {
        this.areas = data;
        for (let i = 0; i < this.areaTotal; i++) {
          this.polygons[i].setStyle({ color: this.colorSelector(this.areas[i].teamId), title: i })
        }
        this.SetPopupDefendTroops();
      }
    })
    //
    //Checks whether multiple people are in an area
    if (this.centerMarkers != undefined && this.centerMarkers.length != 0) {
      this.AreaActivityChecker();
    }
    else if (this.areas.length != 0 && this.centerMarkers.length == 0) {
      for (let i = 0; i < this.areaTotal; i++) {
        if(this.areas[i].positions.length != 0){
          this.centerMarkers[i] = leaflet.marker([this.areas[i].positions[this.areas[i].positions.length - 1].latitude, this.areas[i].positions[this.areas[i].positions.length - 1].longitude], { icon: this.centerMarkerOptions });
          this.centerMarkers[i].addTo(this.centerMarkersLayer);
        }
      }
    }
  }
}
