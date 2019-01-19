import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Body } from '@angular/http/src/body';
import { ContentType } from '@angular/http/src/enums';
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HubConnection } from '@aspnet/signalr';
import { AlertController } from 'ionic-angular';
import { ApiService } from './api.service';
import { delay } from 'rxjs/operator/delay';
import { ToastController } from 'ionic-angular';


@Injectable()
export class SignalrService  {
  
    hubConnection: HubConnection;
    teamDefend : number;
    yourTeam : number;


    constructor(private toastCtrl: ToastController /*private alertC: AlertController,*/) {
    
  }

  RunSignalR(){
    this.hubConnection = new HubConnection("https://riskantwerprest.azurewebsites.net/notification")//.withUrl("http://localhost:53169/api/notification/").build();//("http://localhost:53169/api/notification/");

 

    this.hubConnection.start()
    .then(() => {console.log("Connected");}).catch(err => {console.error(err);});
   

    this.hubConnection.on("Send",data => {  
      //console.log(data);
      //this.Alert(data);
      this.Toast(data);
    });
    

  }


  SendAttackMessage(message : string , team : number ){ // team = team that get attacked
    this.hubConnection.invoke("Send", `${message}`, `${team}`);
  }

  JoinTeam(team: string){
    this.hubConnection.invoke("JoinTeam", `${team}`);
  }

  /*Alert(message: string) {
    let Alertm = this.alertC.create({
      message: `${message}`,
    });
    Alertm.present();
  }*/

  Toast(message: string) {
    let toast = this.toastCtrl.create({
      message:  `${message}`,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

}