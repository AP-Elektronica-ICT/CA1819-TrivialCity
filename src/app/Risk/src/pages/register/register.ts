
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TeamPage } from '../team/team';
import { ApiService, Player } from '../../services/api.service';
import { MapPage } from '../map/map';
import { SignalrService } from '../../services/signalR.service';
import { delay } from 'rxjs/operator/delay';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// ------------------------------------ login/register -----------------------------
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  testbool: boolean = false;
  player: Player[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    private service: ApiService,
    private SignalRservice: SignalrService,
    private menu: MenuController,
    private splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.menu.swipeEnable(false);
    this.service.GetToken();
  }

  Go2App() {
    this.splashScreen.show();
    this.service.GetYourAuthId(this.auth.user.sub)
      .subscribe(data => {
        this.player = data;
        this.service.ChangeId(this.player[0].playerId);
        this.service.GetPlayer(this.player[0].playerId).subscribe(data => this.service.player = data)
        if (this.player[0].teamId == 1)
          this.SignalRservice.JoinTeam("TeamBlue");
        if (this.player[0].teamId == 2)
          this.SignalRservice.JoinTeam("TeamRed");
        if (this.player[0].teamId == 3)
          this.SignalRservice.JoinTeam("TeamGreen");
        if (this.player[0].teamId == 4)
          this.SignalRservice.JoinTeam("TeamYellow");
        if (this.player != []) {
          this.splashScreen.show();
          this.menu.swipeEnable(true);
          this.navCtrl.setRoot(ProfilePage);
          this.splashScreen.hide();
        }
        else {
          this.navCtrl.setRoot(TeamPage);
          this.splashScreen.hide();
        }
      });
  }
}
