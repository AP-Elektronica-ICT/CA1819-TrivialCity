import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player ,Token } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {HubConnection} from '@aspnet/signalr';
import { SignalrService } from '../../services/signalR.service';
import { cpus } from 'os';
import { TeamPage } from '../team/team';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  team : number;

  _number : string = "1";
  PlayerData: Player[] = [];
  hubConnection: HubConnection;

  token:Token;

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private service: ApiService ,public auth: AuthService ,private alertC: AlertController, private SingalRservice: SignalrService ) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  ionViewDidLoad() {
    
  }
  
  ngOnInit(): void {
    //this.SingalRservice.RunSignalR();
    /*this.hubConnection = new HubConnection("http://localhost:53169/notification/")//.withUrl("http://localhost:53169/api/notification/").build();//("http://localhost:53169/api/notification/");

 

    this.hubConnection.start()
    .then(() => {console.log("Connected");}).catch(err => {console.error(err);});
    //.then(() =>  console.log("Connected"));

    this.hubConnection.on("Send",data => {
      console.log(data);
      this.Alert(data);
    });
*/
  }

Check(){
  //this.service.GetToken();
  //this.service.ChangeId(1);
  //this.SingalRservice.JoinTeam("TeamBlue");
  this.service.GetToken();
}

GoTeam() {
  this.navCtrl.setRoot(TeamPage);
}

Check3(){
  //this.service.GetToken();
  //this.service.ChangeId(4);
  this.SingalRservice.JoinTeam("TeamYellow");
}
Check4(){
  //this.service.GetToken();
  //this.service.ChangeId(10);
  this.SingalRservice.SendAttackMessage("team is under attack" , 4);
}


Alert(message: string) {
  let Alertm = this.alertC.create({
    message: `${message}`,
  });
  Alertm.present();
}



}
