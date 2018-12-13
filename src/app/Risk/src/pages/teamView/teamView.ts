import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService,  Team, Player } from '../../services/api.service';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teamView',
  templateUrl: 'teamView.html',
})
export class TeamViewPage {

   teamsInfo: Team[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams , private service: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamView');
    this.service.GetTeams().subscribe(data => this.teamsInfo = data);
    if(this.teamsInfo != undefined && this.teamsInfo != [] ){
      this.service.GetTeamPlayers(1).subscribe(data => this.teamsInfo[0].players = data);
      this.service.GetTeamPlayers(2).subscribe(data => this.teamsInfo[1].players = data);
      this.service.GetTeamPlayers(3).subscribe(data => this.teamsInfo[2].players = data);
      this.service.GetTeamPlayers(4).subscribe(data => this.teamsInfo[3].players = data);
    }
  }



  Check(){
    
   // this.playerCount = this.team1Players.length;
      console.log(this.teamsInfo);
      //console.log(this.TeamsInfo[0]);
  }


}