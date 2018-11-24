import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService, Players } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { testapi } from '../../services/testapi.service';
import { HTTP } from '@ionic-native/http';

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
  PlayerData: any;//Players[];

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private service: ApiService ,private servicetest: testapi,public auth: AuthService , private http: HttpClient) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }

Check(){
  //this.service.GetPlayer2().subscribe(data => this.PlayerData = data);
  //console.log(this.PlayerData);
  this.service.GetToken()
  
}

Check2(){
  //this.service.GetPlayer2().subscribe(data => this.PlayerData = data);
  //console.log(this.PlayerData);
  this.service.TestApi();
}

Check3(){
 this.service.TestAll();
 /*this.test = this.service.testFIX();
 this.test
 .subscribe(data => {
  console.log('my data: ', data);*/
  /*this.test = this.http.get('http://192.168.0.248:53169/api/player');
  this.test
 .subscribe(data => {
  console.log('my data: ', data);
})*/
 
}

Check4(){
  this.service.testapi2();
 /* this.servicetest.getUsers().then(data => {
    this.PlayerData = data;
    console.log(this.PlayerData);
  });*/
}

Check5(){
  //this.service.testdata();
  this.servicetest.getP()//.subscribe(data => this.PlayerData = data);
  console.log(this.PlayerData);
  console.log("pressed check5");
}

Check6(){
  this.service.testdata2().subscribe((data) => {
    this.PlayerData = data;
    console.log(this.PlayerData);
   });
   console.log("pressed check6");
}

  get Search() {
    return this._number;
  } 

  set Search(value: string) {
    this._number = value;
    this.service.GetPlayer(this._number)
                .subscribe( res => {
                res.forEach((p, i) => this.PlayerData[i] = p);
                });           //data => this.PlayerData = data);
    console.log(this.PlayerData)
  } 
  
}
