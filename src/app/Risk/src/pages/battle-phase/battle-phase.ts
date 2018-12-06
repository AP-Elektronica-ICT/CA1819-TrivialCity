import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BattlePhaseContPage } from '../battle-phase-cont/battle-phase-cont';
import { ApiService, Player } from '../../services/api.service';

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
  enemy: Player;

  playerDiceAmount: number = 0;
  enemyDiceAmount: number = 0;

  errormsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService) {
    this.getEnemyDiceAmount();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhasePage');
    this.service.GetYourInfo(this.service.GetYourId()).subscribe(data => this.player = data)
    this.service.GetYourInfo(this.service.GetYourId()).subscribe(data => this.enemy = data)
  }

  getEnemyDiceAmount(){
    if(this.enemy.playerTroops > 3){
      this.enemyDiceAmount = Math.floor((Math.random() * 2)+1);
    }
    else{
      this.enemyDiceAmount = Math.floor((Math.random() * this.enemy.playerTroops)+1);
    }
  }

  getPlayerDiceAmount(amount: any){
    if(this.playerDiceAmount == 0 && amount == 0){
      this.errormsg = 'please select an amount of dice';
    }
    else{
      if((this.player.playerTroops > 3 && amount <= 3)||(this.player.playerTroops < 3 && amount < 3)){
        this.playerDiceAmount = amount;
      }
      else if(this.player.playerTroops < 3 && amount == 3){
        this.errormsg = 'You don´t have that amount of troops left!'
      }
    }
  }

  goToBattlePhaseCont(){
    this.navCtrl.push(BattlePhaseContPage, {
      data: {
        enemyDiceAmount: this.enemyDiceAmount,
        playerDiceAmount: this.playerDiceAmount
      }
    })
  }
}
