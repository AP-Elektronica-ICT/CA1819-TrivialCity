import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService, Players } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;


  _number : string = "1";
  PlayerData: Players[];

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private service: ApiService ,public auth: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }

Check(){
  //this.service.GetPlayer2().subscribe(data => this.PlayerData = data);
  //console.log(this.PlayerData);
  this.service.GetToken();
}

Check2(){
  //this.service.GetPlayer2().subscribe(data => this.PlayerData = data);
  //console.log(this.PlayerData);
  this.service.TestApi();
}

Check3(){
  this.service.TestAll();
}

  get Search() {
    return this._number;
  } 

  set Search(value: string) {
    this._number = value;
    this.service.GetPlayer(this._number).subscribe(data => this.PlayerData = data);
    console.log(this.PlayerData)
  } 
}
