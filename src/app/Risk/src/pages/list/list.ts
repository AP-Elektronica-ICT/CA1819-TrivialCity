import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {HubConnection} from '@aspnet/signalr';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  test: Observable<any>;

  _number : string = "1";
  PlayerData: Player[] = [];
  hubConnection: HubConnection;

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private service: ApiService ,public auth: AuthService ) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  ionViewDidLoad() {
    this.hubConnection = new HubConnection("http://localhost:53169/notification/")//.withUrl("http://localhost:53169/api/notification/").build();//("http://localhost:53169/api/notification/");

 

    this.hubConnection.start()
    .then(() => {console.log("Connected");}).catch(err => {console.error(err);});
    //.then(() =>  console.log("Connected"));

    this.hubConnection.on("Send",data => {
      console.log(data);
    });

   // this.hubConnection.onClosed();
    
   /*this.hubConnection.onClosed((e) => {
    console.log('Connection closed!', e);
  });*/
  //  console.log(this.hubConnection.onClosed());

  }
  ngOnInit(): void {
   /* let connection = new HubConnection("http://localhost:53169/notification");

    connection.on("send",data => {
      console.log(data);
    });

    connection.start()
    .then(() =>  console.log("Connected"));*/
  }

Check(){
  this.service.GetToken();
}

Check2(){
  this.service.GetPlayers().subscribe(data => this.PlayerData = data);
  console.log(this.PlayerData);
  ///this.service.testPost();

  this.hubConnection.start()
    .then(() => {console.log("Connected");}).catch(err => {console.error(err);});
    //.then(() =>  console.log("Connected"));
  this.hubConnection.send("Send","lala");
}



}
