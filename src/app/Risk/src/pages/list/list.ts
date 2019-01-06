import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player, Token } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import { SignalrService } from '../../services/signalR.service';
import { cpus } from 'os';
import { TeamPage } from '../team/team';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, public auth: AuthService, private alertC: AlertController, private SingalRservice: SignalrService) {

  }

  ionViewDidLoad() {

  }


}
