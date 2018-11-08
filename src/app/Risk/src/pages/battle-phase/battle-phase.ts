import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BattlePhaseContPage } from '../battle-phase-cont/battle-phase-cont';

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

  playerTroops: number = 20;
  enemyTroops: number = 15;
  playerDiceAmount: number = 0;
  enemyDiceAmount: number = 0;

  errormsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhasePage');
    this.getEnemyDiceAmount();
  }

  getEnemyDiceAmount(){
    if(this.enemyTroops > 3){
      this.enemyDiceAmount = Math.floor((Math.random() * 2)+1);
    }
    else{
      this.enemyDiceAmount = Math.floor((Math.random() * this.enemyTroops)+1);
    }
  }

  getPlayerDiceAmount(amount: any){
    if(this.playerDiceAmount == 0 && amount == 0){
      this.errormsg = 'please select an amount of dice';
    }
    else{
      if((this.playerTroops > 3 && amount <= 3)||(this.playerTroops < 3 && amount < 3)){
        this.playerDiceAmount = amount;
        console.log(this.playerDiceAmount);
      }
      else if(this.playerTroops < 3 && amount == 3){
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
