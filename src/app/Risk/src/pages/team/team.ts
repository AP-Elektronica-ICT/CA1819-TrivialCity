import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
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

  teams: Team[] = [];
  player: Player;
  teamId: number;
  pUsername: string;
  pEmail: string;

  btnColor: String = "#f4f4f4"

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, private alertCtrl: AlertController, private menu: MenuController, public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
    this.service.GetTeams().subscribe(data => this.teams = data);    
  }

  TeamPicker(color: String){
    let alert = this.alertCtrl.create({
      title: 'Confirm Team',
      subTitle: `You currently selected team ${color}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },{
          text: 'Confirm',
          handler: () => {
            if (color == "Blue") {
              this.teamId = 1;
              this.btnColor = '#4285F4';
            }
        
            if (color == "Red") {
              this.teamId = 2;
              this.btnColor = '#ff4444';
            }
        
            if (color == "Green") {
              this.teamId = 3;
              this.btnColor = '#00c851';
            }
        
            if (color == "Yellow") {
              this.teamId = 4;
              this.btnColor = '#ffeb3b';
            }

            this.service.PostPlayer({
              "teamId": `${this.teamId}`,
              "playerUsername": `${this.pUsername}`,
              "playerEmail": `${this.pEmail}`,
              "playerTitle": "Private",
              "playerLevel": 0,
              "playerExp": 0,
              "playerSilverCoins": 0,
              "playerTroops": 20,
              "playerReserveTroops": 100,
              "authId": `${this.auth.user.sub}`,
            }).subscribe(data => {
            this.player = data
              this.service.ChangeId(this.player.playerId);
            });

            this.menu.swipeEnable(true);
          }
        }
      ]
    });
    alert.present();
  }

  GoPlayerInfo() {
    this.navCtrl.setRoot(ProfilePage);
  }
}
