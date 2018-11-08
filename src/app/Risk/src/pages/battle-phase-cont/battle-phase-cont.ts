import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BattlePhasePage } from '../battle-phase/battle-phase';

/**
 * Generated class for the BattlePhaseContPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-battle-phase-cont',
  templateUrl: 'battle-phase-cont.html',
})
export class BattlePhaseContPage {

  lowestDiceAmount: number = 0;
  results: any = {};
  playerResults: any[] = [];
  enemyResults: any[] = [];
  battleResults: any[] = [];

  imgSrc_Enemy: any[] = [];
  imgSrc_Player: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.results = navParams.get('data');
    this.battleResults[0] = this.results.playerDiceAmount;
    this.battleResults[1] = this.results.enemyDiceAmount;

    this.getPlayerDiceResults();
    this.getEnemyDiceResults();

    this.getBattleResults();
    console.log(this.results);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhaseContPage');
  }

  getPlayerDiceResults() {
    for (let i: number = 0; i < this.results.playerDiceAmount; i++) {
      this.playerResults[i] = Math.floor((Math.random() * 6) + 1);
      this.imgSrc_Player[i] = `../../assets/imgs/dice-${this.playerResults[i]}.png`;
    }
    this.playerResults.sort((a, b) => b - a);
    console.log("player results sorted: "+this.playerResults);
  }

  getEnemyDiceResults() {
    for (let i: number = 0; i < this.results.enemyDiceAmount; i++) {
      this.enemyResults[i] = Math.floor((Math.random() * 6) + 1);
      this.imgSrc_Enemy[i] = `../../assets/imgs/dice-${this.enemyResults[i]}.png`;
    }
    this.enemyResults.sort((a, b) => b - a);
    console.log("enemy results sorted: "+this.enemyResults)
  }

  getBattleResults() {
    if(this.results.playerDiceAmount > this.results.enemyDiceAmount){
      this.lowestDiceAmount = this.results.enemyDiceAmount;
    }
    else{
      this.lowestDiceAmount = this.results.playerDiceAmount;
    }

      for (let i: number = 0; i < this.lowestDiceAmount; i++) {
        if (this.playerResults[i] && this.enemyResults[i]) {
          if (this.playerResults[i] > this.enemyResults[i]) {
            this.battleResults[1] -= 1;
          }
          else {
            this.battleResults[0] -= 1;
          }
        }
      }

      /*for(let i: number = 0; i < 2; i++){
        if(this.battleResults[i] < 0){
          this.battleResults[i] = 0;
        }
      }*/

  }
}