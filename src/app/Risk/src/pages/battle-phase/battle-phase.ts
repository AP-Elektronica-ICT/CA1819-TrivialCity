import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BattlePhaseContPage } from '../battle-phase-cont/battle-phase-cont';
import { ApiService, Player, Area } from '../../services/api.service';
import { ThrowStmt } from '@angular/compiler';
import { delay } from 'rxjs/operators';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignalrService } from '../../services/signalR.service';
import { VirtualTimeScheduler } from 'rxjs';

/**
 * Generated class for the BattlePhasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-battle-phase',
  templateUrl: 'battle-phase.html',
})
export class BattlePhasePage {

  player: Player;
  area: Area;

  isenabled: Boolean;

  playerDiceAmount: number;
  botDiceAmount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService, private splashScreen: SplashScreen, private SingalRservice: SignalrService, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.isenabled = true;
    this.playerDiceAmount, this.botDiceAmount = 0;
    console.log('ionViewDidLoad BattlePhasePage');
    this.splashScreen.show();
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => {
      this.player = data;
      this.service.GetArea(this.player.areaId).subscribe(data => {
        this.area = data
        this.getBotDiceAmount();
        this.splashScreen.hide();
      })
    })


  }

  getBotDiceAmount() {
    if (this.area.defendingTroops > 2) {
      this.botDiceAmount = Math.floor((Math.random() * 2) + 1);
    }
    else {
      this.botDiceAmount = Math.floor((Math.random() * this.area.defendingTroops) + 1);
    }
  }

  getPlayerDiceAmount(amount: any) {
    if (this.playerDiceAmount == 0 && amount == 0) {
      this.ErrorHandler('please select an amount of dice');
    }
    else if (this.player.playerTroops < amount) {
      this.ErrorHandler('You do not have that amount of troops left!');
    }
    else {
      this.playerDiceAmount = amount;
    }
   this.isenabled = false;
  }

  goToBattlePhaseCont() {
    if (this.area != undefined && this.area != null) {
      this.SingalRservice.SendAttackMessage("Your team is under Attack!!", this.area.teamId);
    }
    if(this.playerDiceAmount != 0){
      this.navCtrl.push(BattlePhaseContPage, {
        data: {
          player: this.player,
          area: this.area,
          botDiceAmount: this.botDiceAmount,
          playerDiceAmount: this.playerDiceAmount
        }
      })
    }
  /*  else {
      this.ErrorHandler('Choose an amount of soldiers to attack');
    }*/
  }

  ErrorHandler(errormsg: string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: errormsg
      
    });
    alert.present();
  }
}
