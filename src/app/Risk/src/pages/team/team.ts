import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Team, Player } from '../../services/api.service';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../services/auth.service';
import { delay } from 'rxjs/operators';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  Teams: Team[] = [];
  PlayerInfo: Player;
  TeamId: number;
  pUsername: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, private alertC: AlertController, public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
    this.service.GetTeams().subscribe(data => this.Teams = data);
   // this.service.GetInfo(this.service.GetYourId()).subscribe(data => this.PlayerInfo = data);
  }

  

  TeamPicked(color: string) {

    this.Alert("Team: " + color + " selected, press button 'confirm' to continue");

    if (color == "Blue") {
      this.TeamId = 1;
    }

    if (color == "Red") {
      this.TeamId = 2;
    }

    if (color == "Green") {
      this.TeamId = 3;
    }

    if (color == "Yellow") {
      this.TeamId = 4;
    }

  }

  ConfirmedTeam() {
    this.PostPlayer();
  }

  GoPlayerInfo() {
    //console.log("TeamId: " + this.PlayerInfo.teamId);
    //console.log(this.PlayerInfo);
    this.navCtrl.setRoot(ProfilePage);
  }


PostPlayer(){
this.service.PostPlayer({
  "teamId": `${this.TeamId}`,
  "playerUsername": `${this.pUsername}`,
  "playerEmail": "auth0email",
  "playerTitle": "AntwerpBeginner",
  "playerLevel": 0,
  "playerExp": 0,
  "playerSilverCoins": 0,
  "playerTroops": 20,
  "playerReserveTroops": 100,
  "authId": "4545",
}).subscribe(data => {this.PlayerInfo = data 
  this.service.ChangeId(this.PlayerInfo.playerId);
});
}










  Alert(message: string) {
    let Alertm = this.alertC.create({
      message: `${message}`
    });
    Alertm.present();
  }

}
