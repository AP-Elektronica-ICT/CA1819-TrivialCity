import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ApiService, Team, Player } from '../../services/api.service';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../services/auth.service';
import { delay } from 'rxjs/operators';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignalrService } from '../../services/signalR.service';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: ApiService,
    private alertCtrl: AlertController,
    private menu: MenuController,
    public auth: AuthService,
    private splashScreen: SplashScreen,
    private SignalRservice: SignalrService, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
    this.service.GetTeams().subscribe(data => {
      this.teams = data;
      if (this.teams != [])
        this.splashScreen.hide();
    });
  }

  TeamPicker(color: String) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Team',
      subTitle: `You currently selected team ${color}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        }, {
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


          }
        }
      ]
    });
    alert.present();
  }

  GoPlayerInfo() {
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
      this.service.GetPlayer(this.player.playerId).subscribe(data => this.service.player = data); // set theme
      this.service.GetTeam(this.player.teamId).subscribe(data => this.service.team = data);
      if (this.player.teamId == 1)
        this.SignalRservice.JoinTeam("TeamBlue");
      if (this.player.teamId == 2)
        this.SignalRservice.JoinTeam("TeamRed");
      if (this.player.teamId == 3)
        this.SignalRservice.JoinTeam("TeamGreen");
      if (this.player.teamId == 4)
        this.SignalRservice.JoinTeam("TeamYellow");
      this.menu.swipeEnable(true);
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  getMyStyles() { // zorgt voor dat pagina niets toont wanneer er niets geladen is
    let myStyles = {
      'visibility': this.teams.length > 1 ? 'visible' : 'hidden',
    };
    return myStyles;
  }
}
