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
   team1Players: Player[] = [];
   team2Players: Player[] = [];
   team3Players: Player[] = [];
   team4Players: Player[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , private service: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamView');
    this.service.GetTeams().subscribe(data => this.teamsInfo = data);
    this.service.GetTeamPlayers(1).subscribe(data => this.team1Players = data);
    this.service.GetTeamPlayers(2).subscribe(data => this.team2Players = data);
    this.service.GetTeamPlayers(3).subscribe(data => this.team3Players = data);
    this.service.GetTeamPlayers(4).subscribe(data => this.team4Players = data);
  }



  Check(){
      console.log(this.teamsInfo);
      console.log(this.team1Players);
      console.log(this.team3Players);
      //console.log(this.TeamsInfo[0]);
  }


}
