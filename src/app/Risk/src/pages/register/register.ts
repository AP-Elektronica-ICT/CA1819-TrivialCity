
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { TeamPage } from '../team/team';
import { ApiService, Player } from '../../services/api.service';
import { ProfilePage } from '../profile/profile';
import { SignalrService } from '../../services/signalR.service';

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
  

  PlayerInfo: Player[] = [];

  // user: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    private service: ApiService,
    private SignalRservice: SignalrService,
    private menu: MenuController) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.menu.swipeEnable(false);


  }




  Go2App() {
    this.service.GetYourAuthId(this.auth.user.sub)
      .subscribe(data => {
        this.PlayerInfo = data;
        this.service.ChangeId(this.PlayerInfo[0].playerId)
        if (this.PlayerInfo[0].teamId == 1)
          this.SignalRservice.JoinTeam("TeamBlue");
        if (this.PlayerInfo[0].teamId == 2)
          this.SignalRservice.JoinTeam("TeamRed");
        if (this.PlayerInfo[0].teamId == 3)
          this.SignalRservice.JoinTeam("TeamGreen");
        if (this.PlayerInfo[0].teamId == 4)
          this.SignalRservice.JoinTeam("TeamYellow");
        if (this.PlayerInfo == undefined || this.PlayerInfo == null || this.PlayerInfo == [])
          this.navCtrl.setRoot(TeamPage);
      });


    this.navCtrl.setRoot(HomePage);

  }



  Test() {
    //this.service.GetYourAuthId(this.auth.user.sub).subscribe(data => this.PlayerInfo = data);
    //console.log(this.PlayerInfo[0].playerId)
    //console.log(this.auth.user);
    //console.log(Number(this.auth.user.sub));
    this.navCtrl.setRoot(TeamPage);
  }

  SwipeEnable() {
    this.menu.swipeEnable(true);
  }




}
