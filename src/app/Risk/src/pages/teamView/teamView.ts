import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService,  Team } from '../../services/api.service';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teamView',
  templateUrl: 'teamView.html',
})
export class TeamViewPage {

   TeamsInfo: Team[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams , private service: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamView');
    this.service.GetTeams().subscribe(data => this.TeamsInfo = data);
   
  }



  Check(){
      console.log(this.TeamsInfo);
  }


}
