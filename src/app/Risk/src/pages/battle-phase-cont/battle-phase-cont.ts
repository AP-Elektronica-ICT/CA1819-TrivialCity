import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  playerTeamColor: any;
  area: Area;

  captureConfirmed: Boolean = false;

  lowestDiceAmount: number = 0;
  results: any = {};
  playerResults: any[] = [];
  botResults: any[] = [];
  battleResults: any[] = [];

  imgSrc_Bot: any[] = [];
  imgSrc_Player: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService, public alertCtrl: AlertController) {
    this.results = navParams.get('data');
    this.battleResults[0] = this.results.playerDiceAmount;
    this.battleResults[1] = this.results.botDiceAmount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePhaseContPage');

    this.service.GetInfo(this.service.GetYourId()).subscribe(data => {
      this.player = data
      this.service.GetTeam(this.player.teamId).subscribe(data => this.playerTeamColor = data.teamColor)
      this.service.GetArea(this.player.areaId).subscribe(data => {
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
      if (this.player.playerTroops == 0) {

      }
      else {
        if (this.playerResults[i] && this.botResults[i]) {
          if (this.playerResults[i] > this.botResults[i]) {
            this.area.defendingTroops -= 1;
            this.battleResults[1] -= -1;
            if(this.area.defendingTroops > 0){
              this.area.defendingTroops = 0;
            }
            this.service.PutArea(this.area.areaId, {
              areaId: this.area.areaId,
              defendingTroops: `${this.area.defendingTroops}`
            }).subscribe(data => {
              this.area = data;
            })
          }
          else {
            this.player.playerTroops -= 1;
            this.battleResults[0] -= 1;
            if(this.player.playerTroops < 0){
              this.player.playerTroops = 0;
            }
            this.service.PutPlayer(this.service.GetYourId(), {
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

  CaptureArea(){
    if(this.captureConfirmed == false){
      let alert = this.alertCtrl.create({
        title: 'Leave Troops',
        subTitle: `You currently have ${this.player.playerTroops} troops remaining`,
        inputs: [
          {
            name: 'amount',
            placeholder: 'Amount',
            type: 'number',
          }
        ],
        buttons: [
          {
            text: 'Capture',
            handler: data => {
              data.amount = Math.floor(data.amount);
              if(data.amount <= 0 || data.amount > this.player.playerTroops){
                this.captureConfirmed = false;
                this.errorAlert();
              }
              else{
                this.player.playerTroops -= data.amount;
                this.captureConfirmed = true;
                this.service.PutArea(this.area.areaId, {
                  areaId: this.area.areaId,
                  areaOccupiedBy: `${this.playerTeamColor}`,
                  defendingTroops: `${this.player.playerTroops}`,
                }).subscribe(data => {
                  this.area = data;
                })
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

  errorAlert(){
      let errorAlert = this.alertCtrl.create({
        title: 'Invalid Amount',
        subTitle: 'Please insert a valid amount of troops.',
        buttons: ['Dismiss']
      });
      errorAlert.present();
  }
}