import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  PlayerInfo: Player;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.service.GetYourInfo(this.service.GetYourId()).subscribe(data => this.PlayerInfo = data);
  }
}
