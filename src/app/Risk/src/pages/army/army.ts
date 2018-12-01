import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';

/**
 * Generated class for the ArmyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-army',
  templateUrl: 'army.html',
})
export class ArmyPage {

  PlayerInfo: Player;//[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService , private alertC:AlertController) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ArmyPage');
    this.service.GetYourInfo(this.service.GetYourId()).subscribe(data => this.PlayerInfo = data);

  }

  test() {
    console.log(this.PlayerInfo);
  }

  

  MoveTroops(_troops: number) {
    setTimeout(() => {
      this.service.PutInfo(this.service.GetYourId(),
        {
          playerId: this.service.GetYourId(),
          teamId: this.PlayerInfo.teamId,
          areaId: this.PlayerInfo.areaId,
          auth_id: this.PlayerInfo.auth_id,
          playerUsername: this.PlayerInfo.playerUsername,
          playerEmail: this.PlayerInfo.playerEmail,
          playerLevel: this.PlayerInfo.playerLevel,
          playerExp: this.PlayerInfo.playerExp,
          playerSilverCoins: this.PlayerInfo.playerSilverCoins,
          playerTroops: `${(this.PlayerInfo.playerTroops) + _troops}`,
          playerReserveTroops: `${(this.PlayerInfo.playerReserveTroops) - _troops}`
        })
        .subscribe(data => this.PlayerInfo = data);
      //alert("Troops have arrived");
      this.TroopsArrivedAlert();
    }, 5000);
  }

  TroopsArrivedAlert(){
    let TroopsArrivedAlert = this.alertC.create({
      message:"Troops has arrived!"
    });
    TroopsArrivedAlert.present();
  }



}
