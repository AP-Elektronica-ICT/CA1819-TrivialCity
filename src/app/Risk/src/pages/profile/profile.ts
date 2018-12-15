import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';


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

  playerInfo: Player;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => this.playerInfo = data);
  }

  ChangeUsername() {
    this.ChangeAlert();
  }

  

  ChangeAlert() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
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
            this.service.PutPlayer(this.service.GetYourId(),
              {
                playerId: this.service.GetYourId(),
                playerUsername: userName,
              })
              .subscribe(data => this.playerInfo = data);

          }
        }
      ]
    });
    alert.present();
  }

}
