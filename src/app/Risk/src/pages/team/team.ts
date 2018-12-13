import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Team, Player } from '../../services/api.service';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, private alertC: AlertController, public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
    this.service.GetTeams().subscribe(data => this.Teams = data);
    this.service.GetInfo(this.service.GetYourId()).subscribe(data => this.PlayerInfo = data);
  }

  CheckPlayerInfo() {
    console.log("TeamId: " + this.PlayerInfo.teamId);
  }

  TeamPicked(color: string) {

    this.Alert("Team: " + color + " selected, press button 'confirm' to continue");

    if (color == "Blue") {
      this.TeamId = 1;
      this.service.PutInfo(this.service.GetYourId(),
        {
          playerId: this.service.GetYourId(),
          teamId: this.TeamId
        }
      ).subscribe(data => this.PlayerInfo = data);
    }

    if (color == "Red") {
      this.TeamId = 2;
      this.service.PutInfo(this.service.GetYourId(),
        {
          playerId: this.service.GetYourId(),
          teamId: this.TeamId
        }
      ).subscribe(data => this.PlayerInfo = data);
    }

    if (color == "Green") {
      this.TeamId = 3;
      this.service.PutInfo(this.service.GetYourId(),
        {
          playerId: this.service.GetYourId(),
          teamId: this.TeamId
        }
      ).subscribe(data => this.PlayerInfo = data);
    }

    if (color == "Yellow") {
      this.TeamId = 4;
      this.service.PutInfo(this.service.GetYourId(),
        {
          playerId: this.service.GetYourId(),
          teamId: this.TeamId
        }
      ).subscribe(data => this.PlayerInfo = data);
    }

  }

  ConfirmedClicked() {
    this.navCtrl.setRoot(ProfilePage);
  }

  Alert(message: string) {
    let Alertm = this.alertC.create({
      message: `${message}`
    });
    Alertm.present();
  }

}
