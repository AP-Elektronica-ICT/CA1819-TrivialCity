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

  //Total amount of areas in the game
  areaTotal: number = 3;

  //Essential variables for determining in which area the player is
  areaArray: number[] = [0, 0, 0, 0, 0, 0];
  areaCounter: number = 0;


  areas: Area[] = [];

  color: string;

  polygonsPositions: any[][] = [[],[],[],[]];
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
      })

      for (let i = 1; i <= this.areaTotal; i++) {
        this.service.getAreaPlayers(i).subscribe(data => {this.areas[i].players = data; if(this.areas[this.areaTotal].players != undefined){this.areaPlayersLoaded = true;}});
        this.service.getAreaPositions(i).subscribe(data => {this.areas[i].positions = data; if(this.areas[this.areaTotal].positions != undefined){this.areaPositionsloaded = true;}});
      }

    });

    platform.ready().then(() => {


      //Device Orientation subscription
      const options = { frequency: 50 };
      const orientationSubscription = deviceOrientation.watchHeading(options).subscribe(
        (data3: DeviceOrientationCompassHeading) => { this.playerMarker.setRotationAngle(data3.magneticHeading), this.playerLocation.orientation = data3.magneticHeading }
        , (error: any) => console.log(error + " - error message"));

      //Geolocation subscription - Keeps updating playermarker location
      const positionSubscription = geolocation.watchPosition()
        .filter((p) => p.coords !== undefined) //filter out errors
        .subscribe(position => {
          this.playerMarker.setLatLng([position.coords.latitude, position.coords.longitude])
          this.playerLocation.lat = position.coords.latitude;
          this.playerLocation.lng = position.coords.longitude;
        })
      const loop = Observable.interval(1000).subscribe((val) => {

        for(let i = 1; i <= this.areaTotal; i++){
          if(this.areas){
            if(this.areas[i].positions == undefined){
              this.service.getAreaPositions(i).subscribe(data => {this.areas[i].positions = data})
            }
            if(this.areas[i].players == undefined){
              this.service.getAreaPlayers(i).subscribe(data => {this.areas[i].players = data})
            }
          }
        }
        
        if(this.areas){
          if(this.areas[3].positions != undefined && this.areas[2].positions != undefined && this.areas[1].positions != undefined && this.areaPlayersLoaded == true && this.areaPositionsloaded == true && this.isLoaded == false){
            this.LoadAreaPositions();
            this.polygonsLayer = leaflet.featureGroup(this.polygons);
            this.loadmap();
            this.isLoaded = true;
          }
        }
        
        if (this.playerLocation && this.areas[3].positions && this.player && this.polygons && this.centerMarkers[2] != undefined && this.areas) {

         /* //keeps updating the polygoncolors
          this.service.GetAreas().subscribe(data => {
            if (this.service.areas != data) {
              for (let i = 0; i < this.polygons.length; i++) {
                this.polygons[i].setStyle({ color: this.colorSelector(this.service.areas[i + 1].teamId) })
                console.log(this.polygons[i].options.title);
              }
            }
            this.service.areas = data;
          }) 
          // */
          //Checks whether multiple people are in an area
          this.AreaActivityChecker();

          //Checks in which area the player is
          this.territoryChecker();
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
      this.polygons[i].bindPopup(`<b><h3>${this.areas[i + 1].areaName}</h3></b> Defending Troops: ${this.areas[i + 1].defendingTroops}`);
    }
  }

  //Checks in which area the player is
  territoryChecker() {
    for (let i = 0; i < this.polygons.length; i++) {
      if (inside([this.playerLocation.lat, this.playerLocation.lng], this.polygonsPositions[i + 1])) {
        this.areaArray[i + 1] = i + 1;
        this.areaCounter = i + 1;
      }
      else {
        this.areaArray[i + 1] = 0;
      }
    }
    if (this.areaArray != [] && this.areaArray != [0, 0, 0, 0, 0, 0]) {
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

      this.battleBtnIsVisible = false;
      this.supportBtnIsVisible = false;
    }
    if (this.areas[this.areaCounter].teamId != this.player.teamId) {
      this.battleBtnIsVisible = true;
      this.supportBtnIsVisible = false;
    }
    else {
      this.battleBtnIsVisible = false;
      this.supportBtnIsVisible = true;
    }
  }

  AreaActivityChecker() {
    for (let i = 0; i < this.areaTotal; i++) {
      if (this.areas[i + 1].players.length > 1 /*this number decides how many players are needed to display 'multi player battle marker'*/) {
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
    // this.SetPopupDefendTroops();
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
    for (let i = 1; i <= this.areaTotal; i++) {
      for (let j = 0; j < this.areas[i].positions.length-1; j++) {
        this.polygonsPositions[i].push([this.areas[i].positions[j].latitude, this.areas[i].positions[j].longitude])
        console.log(i+":  "+this.polygonsPositions[i]);
      }
      this.polygons[i-1] = leaflet.polygon(this.polygonsPositions[i], { color: this.colorSelector(this.areas[i].teamId), title: i })
      this.centerMarkers[i] = leaflet.marker([this.areas[i].positions[this.areas[i].positions.length-1].latitude, this.areas[i].positions[this.areas[i].positions.length-1].longitude], { icon: this.centerMarkerOptions });
    }
    console.log(this.polygons)
  }
}
