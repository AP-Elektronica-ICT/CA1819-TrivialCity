import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { NgProgress } from 'ngx-progressbar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  player: Player;
  isenabled: Boolean;
  src;
  xpbar: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, public auth: AuthService, private alertCtrl: AlertController, private ngProgress: NgProgress, private splashScreen: SplashScreen) {

  }

  ionViewDidLoad() {
    this.splashScreen.show();
    console.log('ionViewDidLoad ProfilePage');
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => {
      this.player = data
      this.RankChecker();
      console.log(this.src);
      this.xpbar = String(Math.floor((this.player.playerExp / 1000) * 100)) + '%';
      this.splashScreen.hide();
    });
  }

  RankChecker() {
    if (this.player.playerLevel < 5) { this.src = '../../assets/imgs/ranks/private.png'; }
    else if (this.player.playerLevel >= 50) { this.src = '../../assets/imgs/ranks/sergeant_major_of_the_army.png'; }
    else if (this.player.playerLevel >= 45) { this.src = '../../assets/imgs/ranks/command_sergeant_major.png'; }
    else if (this.player.playerLevel >= 40) { this.src = '../../assets/imgs/ranks/sergeant_major.png'; }
    else if (this.player.playerLevel >= 35) { this.src = '../../assets/imgs/ranks/first_sergeant.png'; }
    else if (this.player.playerLevel >= 30) { this.src = '../../assets/imgs/ranks/master_sergeant.png'; }
    else if (this.player.playerLevel >= 25) { this.src = '../../assets/imgs/ranks/sergeant_first_class.png'; }
    else if (this.player.playerLevel >= 20) { this.src = '../../assets/imgs/ranks/staff_sergeant.png'; }
    else if (this.player.playerLevel >= 15) { this.src = '../../assets/imgs/ranks/sergeant.png'; }
    else if (this.player.playerLevel >= 10) { this.src = '../../assets/imgs/ranks/corporal.png';}
    else if (this.player.playerLevel >= 5) { this.src = '../../assets/imgs/ranks/private_first_class.png'; }
  }

  ChangeUsername() {
    //this.ChangeAlert();
    this.ChangeAlert("Change Username", "Username", "playerUsername")
  }
  ChangeEmail() {
    //this.ChangeAlert();
    this.ChangeAlert("Change Email", "Email", "playerEmail")
  }

  ChangeAlert(title: string, value: string, dataPlayer: string) {
    let alert = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'username',
          placeholder: value
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: (data) => {
            let userName;
            userName = data.username;
            if (dataPlayer == "playerUsername") {
              this.service.PutPlayer(this.service.GetYourId(),
                {
                  playerId: this.service.GetYourId(),
                  playerUsername: userName,
                })
                .subscribe(data => this.player = data);
            }
            if (dataPlayer == "playerEmail") {
              this.service.PutPlayer(this.service.GetYourId(),
                {
                  playerId: this.service.GetYourId(),
                  playerEmail: userName,
                })
                .subscribe(data => this.player = data);
            }
          }
        }
      ]
    });
    alert.present();
  }

  MoveTroops() {
    let alert = this.alertCtrl.create({
      title: 'Send Troops',
      subTitle: `You have ${25 - this.player.playerTroops} free slots in your army. You currently have ${this.player.playerReserveTroops} troops ready for deployment.`,
      inputs: [
        {
          name: 'amount',
          placeholder: 'Amount',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: 'Send',
          handler: data => {
            data.amount = Math.floor(data.amount);
            if (data.amount <= 0 || data.amount > this.player.playerReserveTroops || data.amount > (25 - this.player.playerTroops)) {
              this.errorAlert();
            }
            else {
              this.ngProgress.start();
              setTimeout(() => {
                this.service.PutPlayer(this.service.GetYourId(),
                  {
                    playerId: this.service.GetYourId(),
                    playerTroops: `${this.player.playerTroops + data.amount}`,
                    playerReserveTroops: `${this.player.playerReserveTroops - data.amount}`
                  })
                  .subscribe(data => this.player = data);
                this.ngProgress.done();
                this.isenabled = false;
              }, 10000);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  errorAlert() {
    let errorAlert = this.alertCtrl.create({
      title: 'Invalid Amount',
      subTitle: 'Please insert a valid amount of troops.',
      buttons: ['Dismiss']
    });
    errorAlert.present();
  }
}
