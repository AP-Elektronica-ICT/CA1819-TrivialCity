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

  results: any = {};
  playerResults: any[] = [];
  enemyResults: any[] = [];
  imgSrc_Enemy: any[] = [];
  imgSrc_Player: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.results = navParams.get('data');
    this.getEnemyResults();
    this.getPlayerResults();
    console.log(this.results);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhaseContPage');
  }

  getPlayerResults(){
    for(let i: number = 0; i < this.results.playerDiceAmount; i++ ){
      this.playerResults[i] = Math.floor((Math.random() * 6)+1);
      this.imgSrc_Player[i] = `../../assets/imgs/dice-${this.playerResults[i]}.png`
    }
  }

  getEnemyResults(){
    for(let i: number = 0; i < this.results.enemyDiceAmount; i++ ){
      this.enemyResults[i] = Math.floor((Math.random() * 6)+1);
      this.imgSrc_Enemy[i] = `../../assets/imgs/dice-${this.enemyResults[i]}.png`
    }
  }

}
