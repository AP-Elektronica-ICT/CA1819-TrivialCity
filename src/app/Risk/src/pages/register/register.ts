import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthService ) {
  }

  /*ngOnInit(): void {
    this.auth.get('profile').then(user => this.user = user);
    }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
