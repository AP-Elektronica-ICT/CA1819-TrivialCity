import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  test: Observable<any>;

  _number : string = "1";
  PlayerData: Player[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private service: ApiService ,public auth: AuthService ) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }

Check(){
  this.service.GetToken();
}

Check2(){
  this.service.GetPlayers().subscribe(data => this.PlayerData = data);
  console.log(this.PlayerData);
}


}
