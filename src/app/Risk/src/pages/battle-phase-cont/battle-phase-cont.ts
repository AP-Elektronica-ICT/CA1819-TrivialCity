import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BattlePhasePage } from '../battle-phase/battle-phase';
import { ApiService, Player, Area } from '../../services/api.service';

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
  area: Area;

  lowestDiceAmount: number = 0;
  results: any = {};
  playerResults: any[] = [];
  botResults: any[] = [];
  battleResults: any[] = [];

  imgSrc_Bot: any[] = [];
  imgSrc_Player: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService) {
    this.results = navParams.get('data');
    this.battleResults[0] = this.results.playerDiceAmount;
    this.battleResults[1] = this.results.botDiceAmount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhaseContPage');

    this.service.GetInfo(this.service.GetYourId()).subscribe(data => {
      this.player = data
      this.service.getArea(this.player.areaId).subscribe(data => {
        this.area = data
        this.getPlayerDiceResults();
        this.getBotDiceResults();
        this.getBattleResults();
      });
    });
  }

  getPlayerDiceResults() {
    for (let i: number = 0; i < this.results.playerDiceAmount; i++) {
      this.playerResults[i] = Math.floor((Math.random() * 6) + 1);
      this.imgSrc_Player[i] = `../../assets/imgs/dice-${this.playerResults[i]}.png`;
    }
    this.playerResults.sort((a, b) => b - a);
    console.log("player results sorted: " + this.playerResults);
  }

  getBotDiceResults() {
    for (let i: number = 0; i < this.results.botDiceAmount; i++) {
      this.botResults[i] = Math.floor((Math.random() * 6) + 1);
      this.imgSrc_Bot[i] = `../../assets/imgs/dice-${this.botResults[i]}.png`;
    }
    this.botResults.sort((a, b) => b - a);
    console.log("bot results sorted: " + this.botResults)
  }

  getBattleResults() {
    if (this.results.playerDiceAmount > this.results.botDiceAmount) {
      this.lowestDiceAmount = this.results.botDiceAmount;
    }
    else {
      this.lowestDiceAmount = this.results.playerDiceAmount;
    }

    for (let i: number = 0; i < this.lowestDiceAmount; i++) {
      if (this.playerResults[i] && this.botResults[i]) {
        if (this.playerResults[i] > this.botResults[i]) {
          this.area.defendingTroops -= 1;
          this.service.PutArea(this.player.areaId, {
            areaId: this.player.areaId,
            defendingTroops: `${this.area.defendingTroops}`
          }).subscribe(data => {
            this.area = data;
          })
        }
        else {
          this.player.playerTroops -= 1;
          this.service.PutInfo(this.service.GetYourId(), {
            playerId: this.service.GetYourId(),
            playerTroops: `${this.player.playerTroops}`
          }).subscribe(data => {
            this.player = data;
          })
        }
      }
    }
  }
}