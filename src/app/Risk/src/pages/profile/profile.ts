import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { NgProgress } from 'ngx-progressbar';

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
  xpbar: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, public auth: AuthService, private alertCtrl: AlertController, private ngProgress: NgProgress) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => {
      this.player = data
      this.xpbar = String(Math.floor((this.player.playerExp / 1000) * 100)) + '%';
    });
    console.log(this.service.team.teamColor);
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
      subTitle: `You currently have ${this.player.playerReserveTroops} troops ready for deployment`,
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
            if (data.amount <= 0 || data.amount > this.player.playerReserveTroops) {
              this.errorAlert();
            }
            else {
              this.ngProgress.start();
              setTimeout(() => {
                this.service.PutPlayer(this.service.GetYourId(),
                  {
                    playerId: this.service.GetYourId(),
                    playerTroops: `${(this.player.playerTroops) + data.amount}`,
                    playerReserveTroops: `${(this.player.playerReserveTroops) - data.amount}`
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
