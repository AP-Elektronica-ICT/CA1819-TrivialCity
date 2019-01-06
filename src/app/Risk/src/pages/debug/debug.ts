import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Player, ApiService } from '../../services/api.service';
import { BattlePhasePage } from '../battle-phase/battle-phase';
import { TeamPage } from '../team/team';

/**
 * Generated class for the DebugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
})
export class DebugPage {

  player: Player;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiService) {
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => this.player = data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPage');
  }

  ChangeTeam(teamId: number){
    this.service.PutPlayer(this.player.playerId, {
      playerId: this.player.playerId,
      teamId: teamId
    }).subscribe(data => {
      this.player = data
      this.service.player = data
    });
  }

  SetAreaId(areaId: number){
    this.service.PutPlayer(this.player.playerId, {
      playerId: this.player.playerId,
      areaId: areaId
    }).subscribe(data => this.player = data)
  }

  GoToBattlePhase(){
    this.navCtrl.setRoot(BattlePhasePage);
  }

  GoTeam(){
    this.navCtrl.setRoot(TeamPage);
  }

}
