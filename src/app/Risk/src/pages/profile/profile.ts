import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, public auth: AuthService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => this.playerInfo = data);
  }

  ChangeUsername() {
    //this.ChangeAlert();
    this.ChangeAlert("Change Username" , "Username", "playerUsername")
  }
  ChangeEmail() {
    //this.ChangeAlert();
    this.ChangeAlert("Change Email" , "Email", "playerEmail")
  }

  ChangeAlert(title: string , what: string, dataPlayer: string) {
    let alert = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'username',
          placeholder: what
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
            if(dataPlayer == "playerUsername"){
            this.service.PutPlayer(this.service.GetYourId(),
              {
                playerId: this.service.GetYourId(),
                playerUsername: userName,
              })
              .subscribe(data => this.playerInfo = data);
            }
            if(dataPlayer == "playerEmail"){
              this.service.PutPlayer(this.service.GetYourId(),
                {
                  playerId: this.service.GetYourId(),
                  playerEmail: userName,
                })
                .subscribe(data => this.playerInfo = data);
              }

          }
        
        }
      ]
    });
    alert.present();
  }

  /*ChangeAlert() {
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
  }*/

  
  

}
