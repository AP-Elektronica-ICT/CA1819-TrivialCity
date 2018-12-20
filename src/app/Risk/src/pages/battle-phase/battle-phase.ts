import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BattlePhaseContPage } from '../battle-phase-cont/battle-phase-cont';
import { ApiService, Player, Area } from '../../services/api.service';
import { ThrowStmt } from '@angular/compiler';
import { delay } from 'rxjs/operators';
import { SignalrService } from '../../services/signalR.service';

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

  playerDiceAmount: number = 0;
  botDiceAmount: number = 0;

  errormsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService , private SingalRservice: SignalrService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhasePage');

    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => {
      this.player = data;
      this.service.GetArea(this.player.areaId).subscribe(data => {
        this.area = data
        this.getBotDiceAmount();
      })
    })
    

  }

  getBotDiceAmount() {
    if (this.area.defendingTroops > 3) {
      this.botDiceAmount = Math.floor((Math.random() * 2) + 1);
    }
    else {
      this.botDiceAmount = Math.floor((Math.random() * this.area.defendingTroops) + 1);
    }
  }

  getPlayerDiceAmount(amount: any) {
    if (this.playerDiceAmount == 0 && amount == 0) {
      this.errormsg = 'please select an amount of dice';
    }
    else {
      if ((this.player.playerTroops > 3 && amount <= 3) || (this.player.playerTroops < 3 && amount < 3)) {
        this.playerDiceAmount = amount;
      }
      else if (this.player.playerTroops < 3 && amount == 3) {
        this.errormsg = 'You don´t have that amount of troops left!'
      }
    }
  }

  goToBattlePhaseCont() {
    if(this.area != undefined && this.area != null ){
      this.SingalRservice.SendAttackMessage("Your team is under Attack" , this.area.teamId);
      }
    this.navCtrl.push(BattlePhaseContPage, {
      data: {
        botDiceAmount: this.botDiceAmount,
        playerDiceAmount: this.playerDiceAmount
      }
    })
  }
}
