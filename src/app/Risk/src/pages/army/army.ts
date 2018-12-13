import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';
import { NgProgressService } from 'ng2-progressbar';

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

  public troopsSend: number;
  playerInfo: Player;//[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, private alertC: AlertController, private pService: NgProgressService) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ArmyPage');
    this.service.GetInfo(this.service.GetYourId()).subscribe(data => this.playerInfo = data);

  }

  test() {
    console.log(this.playerInfo);
    console.log(this.troopsSend);
  }



  MoveTroops(_troops: number) {
    _troops = Number(this.troopsSend);
    if (_troops != null && _troops != 0 && _troops > 0) {
      this.Alert("Troops are now walking 2 your location!");
      this.pService.start();
      setTimeout(() => {
        this.service.PutInfo(this.service.GetYourId(),
          {
            playerId: this.service.GetYourId(),
            playerTroops: `${(this.playerInfo.playerTroops) + _troops}`,
            playerReserveTroops: `${(this.playerInfo.playerReserveTroops) - _troops}`
          })
          .subscribe(data => this.playerInfo = data);
        this.Alert("Troops has arrived!");
        this.pService.done();
      }, 10000);
    }
    else
      this.Alert("Fill in how many troops!");
  }



  Alert(message: string) {
    let Alertm = this.alertC.create({
      message: `${message}`
    });
    Alertm.present();
  }
}
