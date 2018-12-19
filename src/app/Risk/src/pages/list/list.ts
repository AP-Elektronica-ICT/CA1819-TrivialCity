import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private service: ApiService ,public auth: AuthService ,private alertC: AlertController ) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  ionViewDidLoad() {
  }
  
  ngOnInit(): void {
    this.hubConnection = new HubConnection("http://localhost:53169/notification/")//.withUrl("http://localhost:53169/api/notification/").build();//("http://localhost:53169/api/notification/");

 

    this.hubConnection.start()
    .then(() => {console.log("Connected");}).catch(err => {console.error(err);});
    //.then(() =>  console.log("Connected"));

    this.hubConnection.on("Send",data => {
      console.log(data);
      this.Alert(data);
    });

  }

Check(){
  this.service.GetToken();
}

Check2(){
  this.service.GetPlayers().subscribe(data => this.PlayerData = data);
  console.log(this.PlayerData);
  //this.service.testPost();
  this.hubConnection.invoke("Send", "Under Attack!");
  
}


Alert(message: string) {
  let Alertm = this.alertC.create({
    message: `${message}`,
  });
  Alertm.present();
}



}
