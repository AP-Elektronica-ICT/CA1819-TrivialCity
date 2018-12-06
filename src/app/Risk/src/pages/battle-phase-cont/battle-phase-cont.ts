import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BattlePhasePage } from '../battle-phase/battle-phase';
import { ApiService, Player } from '../../services/api.service';

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

  player: Player;
  enemy: Player;

  lowestDiceAmount: number = 0;
  results: any = {};
  playerResults: any[] = [];
  enemyResults: any[] = [];
  battleResults: any[] = [];

  imgSrc_Enemy: any[] = []; 
  imgSrc_Player: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService) {
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
    this.service.GetYourInfo(this.service.GetYourId()).subscribe(data => this.player = data);
    this.service.GetYourInfo(this.service.GetYourId()).subscribe(data => this.enemy = data);
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
            this.enemy.playerTroops -= 1;
            this.service.PutInfo(this.service.GetYourId(), {
              playerId: this.service.GetYourId(),
              playerTroops: `${this.enemy.playerTroops}`
            })
          }
          else {
            this.player.playerTroops -= 1;
            this.service.PutInfo(this.service.GetYourId(), {
              playerId: this.service.GetYourId(),
              playerTroops: `${this.player.playerTroops}`
            })
          }
        }
      }
  }
}